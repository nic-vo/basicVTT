import type { PropsWithChildren } from 'react';

import '../styles/globals.css';
import { ClientReduxProvider } from 'state';

const Root = ({ children }: PropsWithChildren) => (
	<html>
		<body className='bg-stone-800 text-stone-300'>
			<ClientReduxProvider>{children}</ClientReduxProvider>
		</body>
	</html>
);

export default Root;
