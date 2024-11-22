import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { segmentedPayload } from 'lib/parsing';
import { type NonNullState } from '../helpers';

export type rawFileState = {
	separatedFile: null | string[];
	name: null | string;
	rawChunks: null | segmentedPayload;
};

const initialState: rawFileState = {
	separatedFile: null,
	name: null,
	rawChunks: null,
};

const rawFileSlice = createSlice({
	name: 'rawFile',
	initialState,
	reducers: {
		ingestFile: (state, action: PayloadAction<NonNullState<rawFileState>>) => {
			state.separatedFile = action.payload.separatedFile;
			state.name = action.payload.name;
		},
		clearFile: (state) => {
			state.separatedFile = null;
			state.name = null;
		},
	},
});

export const { ingestFile, clearFile } = rawFileSlice.actions;
export default rawFileSlice.reducer;
