'use client';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { type PropsWithChildren } from 'react';

import rawFileReducer, { type rawFileState } from './slices/rawFile';

export type RootState = {
	rawFile: rawFileState;
};

export const store = configureStore({
	reducer: {
		rawFile: rawFileReducer,
	},
});

export type AppDispatch = typeof store.dispatch;

export const selectRawFileName = (s: RootState) => s.rawFile.name;
export const selectRawFileLines = (s: RootState) => s.rawFile.separatedFile;
export const selectRawChunks = (s: RootState) => s.rawFile.rawChunks;

export const ClientReduxProvider = ({ children }: PropsWithChildren) => (
	<Provider store={store}>{children}</Provider>
);
