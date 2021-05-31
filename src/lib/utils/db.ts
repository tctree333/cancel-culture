import Redis from 'ioredis';

const key = 'cancelled:global';

export const client = new Redis(process.env['REDIS_URL']);

export async function getCount(host: string): Promise<number> {
	return parseInt(await client.zscore(key, host)) || 0;
}

export async function bumpCount(host: string): Promise<number> {
	return parseInt(await client.zincrby(key, 1, host)) || 0;
}

export async function getLeaderboard(): Promise<{ name: string; count: number }[]> {
	console.log(await client.zrevrangebyscore(key, '+inf', '-inf', 'WITHSCORES', 'LIMIT', 0, 10));
	return [{ name: '', count: 0 }];
}
