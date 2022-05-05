import { getLeaderboard } from '$lib/utils/db';
import { rateLimit } from '$lib/utils/limit';
import type { RequestHandler } from '@sveltejs/kit';

const readLimiter = rateLimit(20, 5, 'read'); // 20 reads every 5 seconds

export const get: RequestHandler = async ({ request, url }) => {
	const token = request.headers.get('x-real-ip') || url.searchParams.get('token');
	const limited = await readLimiter.check(token);
	const lb = limited.isRateLimited ? [] : await getLeaderboard();
	return {
		body: { lb, ...limited }
	};
};
