/*
	General process:
	1.	Remove all carriage returns
	2.	Check if file at least obeys WEBVTT magic number
	3.	Split raw plaintext data by lines
	4.	Iterate over raw plaintext once because
		The data I need is whatever strings are located between
		a. any "-->", which indicates a cue timestamp
		b. the next blank line, indicating end of cue
	5.	Identify all lines that contain cue data, not markers
	6.	Temp store cue data as separate array
	7.	Split the cue payloads into chunks such that the total char count
		of each chunk is comfortably under 5000 (Google translate limit)
*/

// ASSUME ALL INPUT HAS BEEN NON-CRLF
export const toLF = (blobAsText: string) =>
	blobAsText.replaceAll(/\r\n/g, '\n');

export const isWebVTT = (input: string) => /^WEBVTT(( |\t)\S?)?\n/.test(input);

type payloadPart = {
	translate: boolean;
	data: string;
	unTrim: {
		start: boolean;
		end: boolean;
	};
};

export type segmentedPayload = { [key: number]: payloadPart[] };

/*
	twoDimensions tuple
	[0] = line number in baseArray
	[1] = segment number in segmentedPayload
*/

type translationRequest = {
	twoDimensions: [number, number];
	data: string;
}[];

// Output will contain
export const parseOutCuePayloads = (input: string) => {
	// Split by one LF because blank lines are boundaries
	const separated = toLF(input).split('\n');

	// Actual cues, parsed for tags and some whitespace info
	let output: segmentedPayload = {};
	// Flag if a cue contains metadata to skip parsing as a translateable cue
	let metadataDetectedFlag = false;
	let writeFlag = false;
	for (let i = 0; i < separated.length; i++) {
		// Toggle off writing if flag is on and empty line reached
		// indicating ready for a new cue payload
		if (separated[i] === '') {
			writeFlag = false;
			metadataDetectedFlag = false;
			continue;
		}
		// Toggle on writing if the first character is a number and flag is off
		// Number means timestamp, meaning next line is a cue payload
		if (/-->/.test(separated[i]) && writeFlag === false) {
			writeFlag = true;
			continue;
		}
		// Check if cue payload contains metadata
		if (separated[i][0] === '{') {
			metadataDetectedFlag = true;
			continue;
		}
		// Check if line marks metadata end
		if (separated[i][0] === '}' && metadataDetectedFlag) {
			metadataDetectedFlag = false;
			continue;
		}
		// Create a cue if both before a blank line && not in metadata brackets
		if (writeFlag && !metadataDetectedFlag) {
			const complexPayload = separated[i];
			if (
				/<[^>]*>/.test(complexPayload) === false &&
				/^(—|—|-)/.test(complexPayload[0]) === false
			) {
				output[i] = [
					{
						data: complexPayload,
						translate: true,
						unTrim: { start: false, end: false },
					},
				];
			} else {
				output[i] = segmentPayload(complexPayload);
			}
		}
	}
	return { originalLinesArray: separated, cuesWithIndices: output };
};

export const segmentPayload = (input: string) => {
	const output: payloadPart[] = [];
	if (/^(—|—|-)/.test(input))
		output.push({
			data: input[0] + ' ',
			translate: false,
			unTrim: { start: false, end: false },
		});

	let minusList = input.replace(/^(—|—|-) ?/, '').split('');
	let segmentStr = '';
	let inLangTag = false;
	for (let i = 0; i < minusList.length; i++) {
		if (minusList[i] === '<') {
			if (segmentStr !== '') {
				output.push({
					data: segmentStr,
					translate: inLangTag === false,
					unTrim: {
						start: /^ /.test(segmentStr),
						end: / $/.test(segmentStr),
					},
				});
				inLangTag = false;
			}
			segmentStr = '<';
			inLangTag =
				minusList[i + 1] === 'l' &&
				minusList[i + 2] === 'a' &&
				minusList[i + 3] === 'n' &&
				minusList[i + 4] === 'g';
			continue;
		}
		if (minusList[i] === '>') {
			if (/^</.test(segmentStr) === false) {
				segmentStr += '>';
				continue;
			}
			output.push({
				data: segmentStr + '>',
				translate: false,
				unTrim: {
					start: /^ /.test(segmentStr),
					end: / $/.test(segmentStr),
				},
			});
			segmentStr = '';
			continue;
		}
		segmentStr += minusList[i];
	}
	output.push({
		data: segmentStr,
		translate: true,
		unTrim: {
			start: /^ /.test(segmentStr),
			end: / $/.test(segmentStr),
		},
	});
	return output;
};
