import type { PropsWithChildren } from 'react';

const Root = ({ children }: PropsWithChildren) => (
	<html>
		<body>{children}</body>
	</html>
);

export default Root;
