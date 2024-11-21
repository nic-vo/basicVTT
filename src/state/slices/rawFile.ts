import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type rawFileState = {
	rawFile: null | string[];
};

const initialState: rawFileState = { rawFile: null };

const rawFileSlice = createSlice({
	name: 'rawFile',
	initialState,
	reducers: {
		inputChange: (state, action: PayloadAction<string[]>) => {
			state.rawFile = action.payload;
		},
		inputClear: (state) => {
			state.rawFile = null;
		},
	},
});

export const { inputChange, inputClear } = rawFileSlice.actions;
export default rawFileSlice.reducer;
