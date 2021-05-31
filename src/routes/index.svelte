<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ page, fetch }) => {
		const main = page.host.split('.').length === 2;

		let count = 0;
		let leaderboard: { name: string; count: number }[];
		if (!main) {
			const res = await fetch('/inc', { method: 'GET' });
			if (res.ok) {
				const data = await res.json();
				count = data.count;
			}
		} else {
			const res = await fetch('/lb', { method: 'GET' });
			if (res.ok) {
				leaderboard = await res.json();
			}
		}

		return {
			props: {
				main,
				count,
				leaderboard,
				plural: page.host.includes('arecancelled.com'),
				name: page.host
					.split('.')[0]
					.split('-')
					.map((c) => c[0].toUpperCase() + c.substr(1).toLowerCase())
					.join(' ')
			}
		};
	};
</script>

<script lang="ts">
	import Cancel from './_Cancel.svelte';
	import Main from './_Main.svelte';

	export let main: boolean;
	export let name: string;
	export let plural: boolean;
	export let count: number;
	export let leaderboard: { name: string; count: number }[];
</script>

<div class="text-center">
	{#if main}
		<Main {leaderboard} />
	{:else}
		<Cancel {name} {plural} {count} />
	{/if}
</div>
