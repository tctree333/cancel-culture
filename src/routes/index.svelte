<script lang="ts">
	import Cancel from './_Cancel.svelte';
	import Main from './_Main.svelte';

	export let main: boolean;
	export let cancelledName: string;
	export let plural: boolean;
</script>

{#if main}
	<Main />
{:else}
	<Cancel name={cancelledName} {plural} />
{/if}
