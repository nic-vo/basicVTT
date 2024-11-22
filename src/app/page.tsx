import Link from 'next/link';

const Home = () => (
	<main className='p-8 flex flex-col items-center gap-16'>
		<h1 className='text-center font-bold text-6xl'>.vtt Repacker</h1>
		<Link href='/ingest'>Start</Link>
		<section className='flex flex-col gap-8'>
			<h2 className='font-bold text-3xl text-center'>Tool process</h2>
			<ul className='list-decimal max-w-prose flex flex-col gap-4'>
				<li>
					<span>Remove all carriage returns</span>
				</li>
				<li>
					<span>
						Check if file is <code>WEBVTT</code> via the unique{' '}
						<code>WEBVTT</code> first line
					</span>
				</li>
				<li>
					<span>
						Split raw plaintext data by lines since blank lines are explicitly
						used as boundaries between data blocks
					</span>
				</li>
				<li>
					<div>
						<span>
							Hopefully, the only relevant data to translate is in the cues'
							payloads:
						</span>
						<ul className='list-[lower-alpha] ml-8'>
							<li>
								<span>
									Payloads start with a timestamp demarcated by
									&quot;--&gt;&quot; and end with a blank line.
								</span>
							</li>
							<li>
								<span>
									Payloads can contain some HTML-esque tags like{' '}
									<code>&lt;i&gt;</code>, so the tags themselves won&apos;t be
									in the translation, but the text inside tags will be
									translated. The only exception is text within{' '}
									<code>&lt;lang&gt;</code> tags. These indicate that the text
									is explicitly, intentionally from a specific language, and
									therefore, it probably shouldn&apos;t be translated.
								</span>
							</li>
							<li>
								<span>
									Payloads can also contain random blocks of metadata indicated
									by curly braces. Any curly braces and their enclosed content
									will be omitted from translation.
								</span>
							</li>
						</ul>
					</div>
				</li>
				<li>
					<span>
						Any line determined to contain translateable content will be
						replaced by a parsed version of the text content indicating which
						parts of the line will be subject to translation, with a bit of
						information to preserve certain whitespace considerations.
					</span>
				</li>
				<li>
					<span></span>
				</li>
			</ul>
		</section>
	</main>
);

export default Home;
