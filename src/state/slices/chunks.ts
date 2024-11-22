import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { ingestFile } from './rawFile';

export type chunkState = {};

const intialState = {
	chunks: [],
	userInput: [],
};

const chunksSlice = createSlice({
	name: 'chunks',
	initialState: {},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(ingestFile, (state, action) => {
			const { rawChunks } = action.payload;
		});
	},
});
