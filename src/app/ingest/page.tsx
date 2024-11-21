'use client';

import { parseOutCuePayloads, toLF } from 'lib/parsing';
import { useRef, useState } from 'react';

const UploadForm = () => {
	const [disabled, setDisabled] = useState(false);
	const [file, setFile] = useState<string | null>(null);
	const [text, setText] = useState<null | string[]>(null);
	const ref = useRef<HTMLInputElement>();

	const fileOnChange: React.ChangeEventHandler<HTMLInputElement> = async (
		e,
	) => {
		const files = e.target.files;
		if (files.length === 0) {
			setText(null);
			return;
		}
		const text = await files.item(0).text();
		const parsed = parseOutCuePayloads(text).cuesWithIndices.map(({ parts }) =>
			parts
				.filter((thing) => thing.translate)
				.map(
					({ data, translate, unTrim: { start, end } }) =>
						`${start ? ' ' : ''}${data}${end ? ' ' : ''}${translate ? '' : 'TAG'}`,
				)
				.join(''),
		);
		setFile(text);
		setText(parsed);
	};

	const submitter: React.FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();
		setDisabled(true);
		const formData = new FormData();
		for (const file of ref.current.files) {
			formData.append('files', file);
		}
		const response = await fetch('/api/translate', {
			method: 'POST',
			body: formData,
		});
		console.log(response.ok);
		setDisabled(false);
	};

	const resetter = () => {
		setText(null);
		setFile(null);
	};

	const copier = async () => {
		const clipboard = navigator.clipboard;
		await clipboard.writeText(text.join('\n\n'));
	};

	return (
		<>
			<form
				onSubmit={submitter}
				onReset={resetter}
				className='flex flex-col items-center gap-4'>
				<input
					name='vttBlob'
					type='file'
					disabled={disabled}
					onChange={fileOnChange}
					ref={ref}
					multiple
					required
				/>
				<button
					type='submit'
					disabled={disabled}>
					Upload
				</button>
				<button
					type='reset'
					disabled={disabled}>
					Reset
				</button>
			</form>
			<div className='flex w-full gap-4'>
				<div className='w-full flex flex-col'>
					{file &&
						file
							.split('\n')
							.map((line, index) => <p key={`file-line-${index}`}>{line}</p>)}
				</div>
				<div className='w-full flex flex-col'>
					{text && (
						<ul className='list-disc'>
							{text.map((str, index) => (
								<li key={`parsed-display-${index}`}>{str}</li>
							))}
						</ul>
					)}
					{text && <button onClick={copier}>Copy to clipboard</button>}
				</div>
			</div>
		</>
	);
};

export default UploadForm;
