import { getLeaderboard } from '$lib/utils/db';
import { rateLimit } from '$lib/utils/limit';
import type { RequestHandler } from '@sveltejs/kit';

const readLimiter = rateLimit(15, 1000 * 30); // 15 reads every 30 seconds

export const get: RequestHandler = async ({ headers }) => {
	const limited = readLimiter.check(headers['x-real-ip']);
	const lb = limited.isRateLimited ? [] : await getLeaderboard();
	return {
		body: { lb, ...limited }
	};
};
