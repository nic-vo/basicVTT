import { IngestForm, IngestPreview } from './_client';

const IngestPage = () => (
	<main className='flex flex-col items-center gap-8 p-8'>
		<h1 className='font-bold text-5xl'>Ingest</h1>
		<IngestForm />
		<IngestPreview />
	</main>
);

export default IngestPage;
