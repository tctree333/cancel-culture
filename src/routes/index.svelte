<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ page }) => {
		return {
			props: {
				main: page.host.split('.').length === 2,
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
</script>

{#if main}
	<Main />
{:else}
	<Cancel {name} {plural} />
{/if}
