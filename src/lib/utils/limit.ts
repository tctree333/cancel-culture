import Redis from 'ioredis';

export const client = new Redis(process.env['REDIS_URL']);

export const rateLimit = (
	limit: number,
	maxAge: number,
	key: string
): {
	check: (token: string) => Promise<{ isRateLimited: boolean; remaining: number }>;
	peek: (token: string) => Promise<{ isRateLimited: boolean; remaining: number }>;
} => {
	function k(token: string) {
		return `ratelimit:${key}:${token}`;
	}

	return {
		check: async (token: string) => {
			// we use an array to modify the count without updating the maxAge on set
			const tokenCount = parseInt(await client.get(k(token))) || 0;
			if (tokenCount === 0) {
				// we set to tokenCount since we update the value of it later
				await client.set(k(token), tokenCount);
				await client.expire(k(token), maxAge);
			}
			// this mutates the array stored in the cache without updating the maxAge
			await client.incr(k(token));

			const currentUsage = parseInt(await client.get(k(token)));
			const isRateLimited = currentUsage >= limit;
			return {
				isRateLimited,
				remaining: isRateLimited ? 0 : limit - currentUsage
			};
		},

		peek: async (token: string) => {
			const currentUsage = parseInt(await client.get(k(token))) || 0;
			const isRateLimited = currentUsage >= limit;
			return {
				isRateLimited,
				remaining: isRateLimited ? 0 : limit - currentUsage
			};
		}
	};
};
