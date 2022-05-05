import preprocess from 'svelte-preprocess';
import vercel from '@sveltejs/adapter-vercel';
import dotenv from 'dotenv';
dotenv.config();

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		})
	],

	kit: {
		adapter: vercel(),
		browser: { router: false }
	}
};

export default config;
