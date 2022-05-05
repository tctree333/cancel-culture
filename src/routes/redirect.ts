import type { RequestHandler } from '@sveltejs/kit';
import slugify from 'slugify';

export const get: RequestHandler = async ({ url }) => {
	const plural =
		url.searchParams.get('plural') === 'true'
			? true
			: url.searchParams.get('plural') === 'false'
			? false
			: null;
	const name = url.searchParams.get('name');
	if (name === null || name === '' || plural === null) {
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
