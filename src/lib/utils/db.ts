import Redis from 'ioredis';

const key = 'cancelled:global';

export const client = new Redis(process.env['REDIS_URL']);

export async function getCount(host: string): Promise<number> {
	return parseInt(await client.zscore(key, host)) || 0;
}

export async function getRank(host: string): Promise<number> {
	const data = await client.zrevrank(key, host);
	return data === null ? NaN : data + 1;
}

export async function bumpCount(host: string): Promise<number> {
	return parseInt(await client.zincrby(key, 1, host)) || 0;
}

export async function getLeaderboard(
	limit: number | false = 10
): Promise<{ name: string; count: number }[]> {
	const data: string[] =
		limit === false
			? await client.zrevrangebyscore(key, '+inf', '-inf', 'WITHSCORES')
			: await client.zrevrangebyscore(key, '+inf', '-inf', 'WITHSCORES', 'LIMIT', 0, limit);

	return data
		.reduce(
			// transforms an array of [name, count, name, count, ...]
			// into [[name, count], [name, count], ...]
			(acc, curr) => {
				if (acc[acc.length - 1].length < 2) {
					acc[acc.length - 1].push(curr);
				} else {
					acc.push([curr]);
				}
				return acc;
			},
			[[]] as string[][]
		)
		.map(
			// transforms an array of [[name, count], ...]
			// into [{name, count}, ...]
			(value) => ({
				// converts hyphens to spaces, as well as making the name title case
				name: value[0]
					.split('-')
					.map((c) => c[0].toUpperCase() + c.slice(1).toLowerCase())
					.join(' '),
				count: parseInt(value[1]) || 0
			})
		);
}
