import LRU from 'lru-cache';

export const rateLimit = (
	limit: number,
	maxAge: number
): {
	check: (token: string) => { isRateLimited: boolean; remaining: number };
	peek: (token: string) => { isRateLimited: boolean; remaining: number };
} => {
	const tokenCache = new LRU<string, [number]>({
		max: 1000,
		maxAge
	});

	return {
		check: (token: string) => {
			// we use an array to modify the count without updating the maxAge on set
			const tokenCount = tokenCache.get(token) || [0];
			if (tokenCount[0] === 0) {
				// we set to tokenCount since we update the value of it later
				tokenCache.set(token, tokenCount);
			}
			// this mutates the array stored in the cache without updating the maxAge
			tokenCount[0] += 1;

			const currentUsage = tokenCount[0];
			const isRateLimited = currentUsage >= limit;
			return {
				isRateLimited,
				remaining: isRateLimited ? 0 : limit - currentUsage
			};
		},
		peek: (token: string) => {
			const use = tokenCache.peek(token) || [0];
			const currentUsage = use[0];
			const isRateLimited = currentUsage >= limit;
			return {
				isRateLimited,
				remaining: isRateLimited ? 0 : limit - currentUsage
			};
		}
	};
};
