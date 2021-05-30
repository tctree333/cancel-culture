import type { RequestHandler } from '@sveltejs/kit';
import slugify from 'slugify';

export const get: RequestHandler = async ({ query }) => {
	const plural =
		query.get('plural') === 'true' ? true : query.get('plural') === 'false' ? false : null;
	const name = query.get('name');
	if (name === null || plural === null) {
		return {
			status: 303,
			headers: {
				location: `https://iscancelled.com/`
			}
		};
	}
	return {
		status: 303,
		headers: {
			location: `https://${slugify(name, { strict: true })}.${
				plural ? 'arecancelled' : 'iscancelled'
			}.com/`
		}
	};
};
