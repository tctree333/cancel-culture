import LRU from 'lru-cache';

export const rateLimit = (
	limit: number,
	maxAge: number
): {
	check: (token: string) => { isRateLimited: boolean; remaining: number };
	peek: (token: string) => { isRateLimited: boolean; remaining: number };
} => {
	const tokenCache = new LRU<string, number>({
		max: 1000,
		maxAge
	});

	return {
		check: (token: string) => {
			let tokenCount = tokenCache.get(token) || 0;
			tokenCount += 1;
			tokenCache.set(token, tokenCount);

			const currentUsage = tokenCount;
			const isRateLimited = currentUsage >= limit;
			return {
				isRateLimited,
				remaining: isRateLimited ? 0 : limit - currentUsage
			};
		},
		peek: (token: string) => {
			const currentUsage = tokenCache.get(token) || 0;
			const isRateLimited = currentUsage >= limit;
			return {
				isRateLimited,
				remaining: isRateLimited ? 0 : limit - currentUsage
			};
		}
	};
};
