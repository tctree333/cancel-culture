import { getLeaderboard } from '$lib/utils/db';
import { rateLimit } from '$lib/utils/limit';
import type { RequestHandler } from '@sveltejs/kit';

const readLimiter = rateLimit(15, 1000 * 30); // 15 reads every 30 seconds

export const get: RequestHandler = async ({ headers, query }) => {
	const token = headers['x-real-ip'] || query.get('token');
	const limited = readLimiter.check(token);
	const lb = limited.isRateLimited ? [] : await getLeaderboard(false);
	return {
		body: { lb, ...limited }
	};
};
