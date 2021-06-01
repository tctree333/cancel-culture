import type { GetSession, Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ request, render }) => {
	request.locals.ip = request.headers['x-real-ip'];

	return await render(request);
};

export const getSession: GetSession = (request) => {
	return {
		ip: request.locals.ip
	};
};
