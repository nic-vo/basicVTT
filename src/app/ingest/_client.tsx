'use client';

import { parseOutCuePayloads } from 'lib/parsing';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	AppDispatch,
	RootState,
	selectRawFileLines,
	selectRawFileName,
} from 'state';
import { clearFile, ingestFile } from 'state/slices/rawFile';

export const IngestForm = () => {
	const dispatch = useDispatch<AppDispatch>();
	const ref = useRef<HTMLInputElement>();

	const submitter: React.FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();
		const input = ref.current;
		const file = input.files.item(0);
		if (!file) return;
		const text = await file.text();
		if (/^WEBVTT(( |\t).*)?\n/.test(text) === false) return;
		const { originalLinesArray: separatedFile, cuesWithIndices: rawChunks } =
			parseOutCuePayloads(text);
		dispatch(ingestFile({ separatedFile, rawChunks, name: file.name }));
	};

	const resetter = () => {
		dispatch(clearFile());
	};

	return (
		<form
			onSubmit={submitter}
			onReset={resetter}
			className='flex flex-col items-center gap-4'>
			<input
				name='vttBlob'
				type='file'
				ref={ref}
				multiple
				required
			/>
			<button type='submit'>Ingest</button>
			<button type='reset'>Clear</button>
		</form>
	);
};

export const IngestPreview = () => {
	const lines = useSelector(selectRawFileLines);
	const name = useSelector(selectRawFileName);
	return (
		<section className='flex flex-col gap-4'>
			<h2 className='text-center font-bold text-2xl'>
				Preview{name ? ` - ${name}` : ''}
			</h2>
			{lines ? (
				<ul>
					{lines.map((line, index) => (
						<li key={`line-preview-${index}`}>
							<span>{line === '' ? <br /> : line}</span>
						</li>
					))}
				</ul>
			) : (
				<span className='text-stone-500'>There&apos;s nothing here...</span>
			)}
		</section>
	);
};
