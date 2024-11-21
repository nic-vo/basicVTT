import { NextRequest } from 'next/server';

export const POST = (req: NextRequest) => {
	return Response.json({ message: 'Received' }, { status: 201 });
};
