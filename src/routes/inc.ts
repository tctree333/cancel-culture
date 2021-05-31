import { bumpCount, getCount, getRank } from '$lib/utils/db';
import { rateLimit } from '$lib/utils/limit';
import type { RequestHandler } from '@sveltejs/kit';
import type { ReadOnlyFormData } from '@sveltejs/kit/types/helper';

const writeLimiter = rateLimit(100, 1000 * 60 * 15); // 100 writes every 15 minutes
const readLimiter = rateLimit(15, 1000 * 30); // 15 reads every 30 seconds

export const get: RequestHandler = async ({ headers, host }) => {
	if (host.split('.').length !== 2) {
		const limited = readLimiter.check(headers['x-real-ip']);
		const count = limited.isRateLimited ? 0 : await getCount(host.split('.')[0]);
		const rank = limited.isRateLimited ? 0 : await getRank(host.split('.')[0]);
		return {
			body: {
				readlimit: { ...limited },
				writelimit: { ...writeLimiter.peek(headers['x-real-ip']) },
				count,
				rank
			}
		};
	}
	return {
		body: {
			writelimit: { ...writeLimiter.peek(headers['x-real-ip']) }
		}
	};
};

export const post: RequestHandler = async ({ headers, host, body }) => {
	if (host.split('.').length !== 2) {
		const limited = writeLimiter.check(headers['x-real-ip']);
		const count = limited.isRateLimited ? 0 : await bumpCount(host.split('.')[0]);
		const rank = limited.isRateLimited ? 0 : await getRank(host.split('.')[0]);
		if ((body as ReadOnlyFormData)?.get?.('noscript')) {
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
