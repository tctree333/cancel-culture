import { getLeaderboard } from '$lib/utils/db';
import { rateLimit } from '$lib/utils/limit';
import type { RequestHandler } from '@sveltejs/kit';

const readLimiter = rateLimit(15, 1000 * 30, 'read'); // 15 reads every 30 seconds

export const get: RequestHandler = async ({ request, url }) => {
	const token = request.headers['x-real-ip'] || url.searchParams.get('token');
	const limited = await readLimiter.check(token);
	const lb = limited.isRateLimited ? [] : await getLeaderboard();
	return {
		body: { lb, ...limited }
	};
};
