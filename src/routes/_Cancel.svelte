<script lang="ts">
	import CancelButton from '$lib/components/CancelButton.svelte';

	export let name: string;
	export let plural: boolean;

	export let count: number;
	export let writesLeft: number;
</script>

<h1 class="mt-16 mb-24 text-6xl">
	{name}
	{plural ? 'have' : 'has'} been cancelled:
	<div class="my-8 tabular-nums">{count} times!</div>
</h1>

<CancelButton bind:count bind:writesLeft />

<p class="text-xl mt-14 tabular-nums">
	You have {writesLeft} cancels left. Wait 15 minutes to refresh.
</p>

<p class="mt-20 text-lg">
	Want to cancel more? <a
		class="text-blue-800 underline dark:text-blue-300"
		href="https://iscancelled.com/">Go back to the main page.</a
	>
</p>
<p class="mt-4 text-lg">
	<a
		class="text-blue-800 underline dark:text-blue-300"
		href="/redirect?name={name}&plural={!plural}">Toggle plural/singular.</a
	>
</p>
