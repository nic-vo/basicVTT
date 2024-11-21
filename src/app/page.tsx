import { UploadForm } from './_client';

const Home = () => (
	<main className='p-8 flex flex-col items-center gap-16'>
		<h1 className='text-center font-bold text-6xl'>Upload files Here</h1>
		<UploadForm />
	</main>
);

export default Home;
