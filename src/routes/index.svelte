<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ page, session, fetch }) => {
		const main = page.host.split('.').length === 2;

		let count = 0;
		let limited = false;
		let writesLeft = 0;
		let rank = NaN;
		let leaderboard: { name: string; count: number }[];

		const res = await fetch(`/inc?token=${session.ip}`, { method: 'GET' });
		if (res.ok) {
			const data = await res.json();
			if (!main) {
				rank = data.rank;
				count = data.count;
				limited = data.readlimit.isRateLimited;
			}
			writesLeft = data.writelimit.remaining;
		}
		if (main) {
			const res = await fetch(`/lb?token=${session.ip}`, { method: 'GET' });
			if (res.ok) {
				const data = await res.json();
				leaderboard = data.lb;
				limited = data.isRateLimited;
			}
		}

		return {
			props: {
				main,
				count,
				rank,
				leaderboard,
				limited,
				writesLeft,
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
	import Head from '$lib/components/Head.svelte';
	import Cancel from './_Cancel.svelte';
	import Main from './_Main.svelte';

	export let main: boolean;
	export let name: string;
	export let plural: boolean;
	export let count: number;
	export let limited: boolean;
	export let writesLeft: number;
	export let rank: number;
	export let leaderboard: { name: string; count: number }[];

	let title = main ? 'Cancel Anything!' : `${name} ${plural ? 'Are' : 'Is'} Cancelled!`;
	let description = main
		? 'Cancel culture has truly gone too far. Join us as we cancel even more people and things! ' +
		  'Want a website that shows the top cancelled people or things? This is it! ' +
		  'Cancel your friends, relatives, or that weird food item sitting in the back of your fridge since last year.'
		: `${name} ${plural ? 'are' : 'is'} cancelled! ` +
		  `What terrible things did they do? Who knows! All we know is that ` +
		  `${name} ${plural ? 'are' : 'is'} cancelled, and they probably deserve it! ` +
		  `Join us as we celebrate the #${name.split(' ').join('')}${plural ? 'Are' : 'Is'}OverParty!`;
</script>

<Head {title} {description} index={main} />

<div class="text-center">
	{#if main}
		<Main {leaderboard} {writesLeft} />
	{:else}
		<Cancel {name} {plural} {count} {writesLeft} {rank} />
	{/if}
</div>

{#if limited}
	<div class="fixed left-0 right-0 w-full mx-auto max-w-7xl bottom-12">
		<section
			class="relative px-6 py-4 mx-6 bg-yellow-300 rounded-md shadow-lg sm:px-8 sm:py-6 dark:bg-yellow-600 w-max"
		>
			<button
				type="button"
				aria-label="Close popup"
				class="absolute top-0 right-0 p-3 outline-none focus-visible:ring-2"
				on:click={() => (limited = false)}
				><svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="3"
						d="M6 18L18 6M6 6l12 12"
					/></svg
				></button
			>
			<strong>Slow down there!</strong>
			<p>Please wait 30 seconds before continuing.</p>
		</section>
	</div>
{/if}
