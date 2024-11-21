import type { PropsWithChildren } from 'react';

import '../styles/globals.css';

const Root = ({ children }: PropsWithChildren) => (
	<html>
		<body className='bg-stone-800 text-stone-300'>{children}</body>
	</html>
);

export default Root;
