import { NextRequest } from 'next/server';

export const GET = (req: NextRequest) => {
	return Response.json({ message: 'Received' }, { status: 201 });
};
