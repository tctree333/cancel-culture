import LRU from 'lru-cache';

export const rateLimit = (): {
	check: (limit: number, token: string) => { isRateLimited: boolean; remaining: number };
} => {
	const tokenCache = new LRU({
		max: 500,
		maxAge: 60000
	});

	return {
		check: (limit, token) => {
			const tokenCount = tokenCache.get(token) || [0];
			if (tokenCount[0] === 0) {
				tokenCache.set(token, tokenCount);
			}
			tokenCount[0] += 1;

			const currentUsage = tokenCount[0];
			const isRateLimited = currentUsage >= limit;
			return {
				isRateLimited,
				remaining: isRateLimited ? 0 : limit - currentUsage
			};
		}
	};
};
