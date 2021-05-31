import { getLeaderboard } from '$lib/utils/db';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async () => {
	return {
		body: await getLeaderboard()
	};
};
