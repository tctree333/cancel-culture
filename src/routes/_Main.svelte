<script lang="ts">
	export let leaderboard: { name: string; count: number }[];
	export let writesLeft: number;

	const placeholders = [
		{ text: 'you', plural: true },
		{ text: 'sleeping', plural: false },
		{ text: 'aging', plural: false },
		{ text: 'this pencil', plural: false },
		{ text: 'government spies', plural: true },
		{ text: 'bad posture', plural: false },
		{ text: 'javascript', plural: false },
		{ text: 'computers', plural: true },
		{ text: 'dying', plural: false },
		{ text: 'dehydrated people', plural: true },
		{ text: 'sus amogus', plural: false },
		{ text: 'cancel culture', plural: false },
		{ text: 'everything', plural: false }
	];
	const placeholder =
		placeholders[Math.floor((new Date().getMinutes() / 60) * placeholders.length)];
</script>

<h1 class="mt-16 mb-8 text-6xl">Cancel Culture Creator</h1>
<p class="my-4 text-xl">
	Cancel culture has truly gone too far. Join us as we cancel even more people!
</p>
<h2 class="mt-12 mb-10 text-4xl">Who would you like to cancel?</h2>
<form class="flex flex-wrap" action="/redirect" method="GET">
	<label class="min-w-[16rem] input">
		<p class="sr-only">The entity to cancel:</p>
		<input type="text" name="name" class="px-4" placeholder={placeholder.text} />
	</label>
	<label class="flex-1 min-w-max">
		<p class="sr-only">Plural</p>
		<select name="plural" class="pl-4 pr-10 appearance-none">
			<option value="false" selected={!placeholder.plural}>.iscancelled.com</option>
			<option value="true" selected={placeholder.plural}>.arecancelled.com</option>
		</select>
	</label>
	<button
		class="flex-1 h-16 px-8 py-4 text-2xl bg-pink-300 outline-none min-w-max dark:bg-pink-700 focus-visible:ring-4 ring-offset-4 dark:ring-offset-gray-800 dark:ring-blue-300"
		type="submit">Cancel!</button
	>
</form>
<p class="text-xl mt-14 tabular-nums">
	You have {writesLeft} cancels left. Wait 15 minutes to refresh.
</p>

<h3 class="mt-20 mb-8 text-5xl">Most Cancelled:</h3>
<div class="flex justify-center w-full">
	<ol class="pl-10 text-2xl text-left list-decimal sm:pr-10">
		{#each leaderboard as entry}
			<li class="mb-4">
				<a class="underline" href="/redirect?name={entry.name}&plural=false">{entry.name}</a>: {entry.count}
				cancel{entry.count === 1 ? '' : 's'}!
			</li>
		{/each}
	</ol>
</div>

<style lang="postcss">
	.input {
		flex: 100;
	}

	select {
		background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
		background-position: right 0.5rem center;
		background-repeat: no-repeat;
		background-size: 1.5em 1.5em;
	}

	input[type='text'],
	select {
		@apply w-full border-gray-400 bg-white border h-16 text-2xl outline-none focus-visible:ring-4 ring-offset-4;
	}

	:global(.dark) input[type='text'],
	:global(.dark) select {
		@apply border-white bg-gray-800 ring-offset-gray-800 ring-blue-300;
	}
</style>
