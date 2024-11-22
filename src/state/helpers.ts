export type NonNullState<T> = {
	[K in keyof T]: NonNullable<T[K]>;
};
