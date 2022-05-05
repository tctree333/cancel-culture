import { getLeaderboard } from '$lib/utils/db';
import { rateLimit } from '$lib/utils/limit';
import type { RequestHandler } from '@sveltejs/kit';

const readLimiter = rateLimit(60, 30, 'read'); // 60 reads every 30 seconds

export const get: RequestHandler = async ({ request, url }) => {
	const token = request.headers.get('x-real-ip') || url.searchParams.get('token');
	const limited = await readLimiter.check(token);
	const lb = limited.isRateLimited ? [] : await getLeaderboard(false);
	return {
		body: { lb, ...limited }
	};
};
