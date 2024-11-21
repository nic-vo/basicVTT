import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { type PropsWithChildren } from 'react';

import rawFileReducer from './slices/rawFile';

export const store = configureStore({
	reducer: {
		rawFile: rawFileReducer,
	},
});

export type AppDispatch = typeof store.dispatch;

export const ClientReduxProvider = ({ children }: PropsWithChildren) => (
	<Provider store={store}>{children}</Provider>
);
