<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ page, fetch }) => {
		let count = 0;

		const res = await fetch('/inc', { method: 'GET' });
		if (res.ok) {
			const data = await res.json();
			count = data.count;
		}
		return {
			props: {
				main: page.host.split('.').length === 2,
				count,
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
</script>

{#if main}
	<Main />
{:else}
	<Cancel {name} {plural} {count} />
{/if}
