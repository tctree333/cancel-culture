import type { RequestHandler } from '@sveltejs/kit';

const buffer = [];

export const get: RequestHandler = async ({ headers }) => {
	buffer.push({ ip: headers['x-real-ip'], time: new Date().toString() });
	return {
		body: buffer
	};
};
