import type { GetSession, Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.ip = event.request.headers.get('x-real-ip');

	return await resolve(event);
};

export const getSession: GetSession = (event) => {
	return {
		ip: event.locals.ip
	};
};
