import { bumpCount, getCount, getRank } from '$lib/utils/db';
import { rateLimit } from '$lib/utils/limit';
import type { RequestHandler } from '@sveltejs/kit';

const writeLimiter = rateLimit(100, 1000 * 60 * 15, 'write'); // 100 writes every 15 minutes
const readLimiter = rateLimit(15, 1000 * 30, 'read'); // 15 reads every 30 seconds

export const get: RequestHandler = async ({ request, url }) => {
	const token = request.headers['x-real-ip'] || url.searchParams.get('token');
	if (url.host.split('.').length !== 2) {
		const limited = await readLimiter.check(token);
		const count = limited.isRateLimited ? 0 : await getCount(url.host.split('.')[0]);
		const rank = limited.isRateLimited ? 0 : await getRank(url.host.split('.')[0]);
		return {
			body: {
				readlimit: { ...limited },
				writelimit: { ...(await writeLimiter.peek(token)) },
				count,
				rank
			}
		};
	}
	return {
		body: {
			writelimit: { ...(await writeLimiter.peek(token)) }
		}
	};
};

export const post: RequestHandler = async ({ request, url }) => {
	if (url.host.split('.').length !== 2) {
		const limited = await writeLimiter.check(request.headers['x-real-ip']);
		const count = limited.isRateLimited ? 0 : await bumpCount(url.host.split('.')[0]);
		const rank = limited.isRateLimited ? 0 : await getRank(url.host.split('.')[0]);
		const body = await request.formData();
		if (body.get('noscript')) {
			return {
				status: 302,
				headers: {
					location: '/'
				}
			};
		}
		return {
			body: {
				...limited,
				count,
				rank
			}
		};
	}
	return {
		status: 302,
		headers: {
			location: '/'
		}
	};
};
