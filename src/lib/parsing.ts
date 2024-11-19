// ASSUME ALL INPUT HAS BEEN NON-CRLF
export const toLF = (blobAsText: string) =>
	blobAsText.replaceAll(/\r\n/g, '\n');

export const isWebVTT = (input: string) => /^WEBVTT(( |\t)\S?)?\n/.test(input);

const handlerTest = () => {};
