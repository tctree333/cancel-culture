import { bumpCount, getCount } from '$lib/utils/db';
import type { RequestHandler } from '@sveltejs/kit';
import type { ReadOnlyFormData } from '@sveltejs/kit/types/helper';

export const get: RequestHandler = async ({ host }) => {
	return {
		body: {
			count: host.split('.').length === 2 ? 0 : await getCount(host.split('.')[0])
		}
	};
};

export const post: RequestHandler = async ({ host, body }) => {
	if ((body as ReadOnlyFormData).get('noscript')) {
		if (host.split('.').length === 2) await bumpCount(host.split('.')[0]);
		return {
			status: 302,
			headers: {
				location: '/'
			}
		};
	}
	return {
		body: {
			count: host.split('.').length === 2 ? 0 : await bumpCount(host.split('.')[0])
		}
	};
};
