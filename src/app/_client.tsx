'use client';

import { useState } from 'react';

export const UploadForm = () => {
	const [disabled, setDisabled] = useState(false);
	const [text, setText] = useState<null | string>(null);

	const fileOnChange: React.ChangeEventHandler<HTMLInputElement> = async (
		e,
	) => {
		const files = e.target.files;
		if (files.length === 0) {
			setText(null);
			return;
		}
		setText(await files.item(0).text());
	};

	const submitter: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
	};

	const resetter = () => {
		setText(null);
	};

	return (
		<>
			<form
				onSubmit={submitter}
				onReset={resetter}>
				<input
					name='vttBlob'
					type='file'
					disabled={disabled}
					onChange={fileOnChange}
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
			<div>{text && <p>{text}</p>}</div>
		</>
	);
};
