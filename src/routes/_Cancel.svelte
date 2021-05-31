<script lang="ts">
	import CancelButton from '$lib/components/CancelButton.svelte';

	export let name: string;
	export let plural: boolean;

	export let count: number;
</script>

<h1 class="text-6xl mt-16 mb-24">
	{name}
	{plural ? 'have' : 'has'} been cancelled:
	<div class="tabular-nums my-8">{count} times!</div>
</h1>

<CancelButton bind:count />

<p class="text-lg mt-24">
	Want to cancel more? <a
		class="text-blue-800 underline dark:text-blue-300"
		href="https://iscancelled.com/">Go back to the main page.</a
	>
</p>
