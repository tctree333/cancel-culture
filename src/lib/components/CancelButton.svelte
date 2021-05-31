<script lang="ts">
	import { enhance } from '$lib/utils/form';

	let pushed = false;
	let focused = false;

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.code === 'Enter' && focused) {
			pushed = true;
		}
	};
	const onKeyUp = (e: KeyboardEvent) => {
		if (e.code === 'Enter' && focused) {
			pushed = false;
		}
	};

	export let count: number;
	export let writesLeft: number;
	export let rank: number;
</script>

<form
	action="/inc"
	method="POST"
	class="flex justify-center w-full"
	use:enhance={{
		result: async (res) => {
			const data = await res.json();
			count = data.count;
			writesLeft = data.remaining;
			rank = data.rank;
		}
	}}
>
	<noscript>
		<input type="hidden" name="noscript" value="true" />
	</noscript>
	<button
		class:pushed
		on:focus={() => {
			focused = true;
		}}
		on:blur={() => {
			focused = false;
		}}
		on:keydown={onKeyDown}
		on:keyup={onKeyUp}
		type="submit"><span>Cancel!</span></button
	>
</form>

<style lang="postcss">
	/* These styles are adapted from Josh W. Comeau's post, https://www.joshwcomeau.com/animation/3d-button/ */
	button,
	button span {
		@apply rounded-3xl;
	}
	button {
		@apply border-0 bg-red-800 outline-none;
		user-select: none;
		background: linear-gradient(
			to left,
			hsl(340deg 100% 28%) 0%,
			hsl(340deg 100% 32%) 8%,
			hsl(340deg 100% 32%) 92%,
			hsl(340deg 100% 28%) 100%
		);
		-webkit-tap-highlight-color: transparent;
	}
	button span {
		@apply py-8 px-12 block text-2xl font-medium text-white bg-red-600 tabular-nums;
		will-change: transform;
		transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
		transform: translateY(-8px);
	}
	button:focus {
		@apply ring-4 ring-offset-4;
	}
	:global(.dark) button {
		@apply ring-offset-gray-800 ring-blue-300;
	}
	button:focus:not(:focus-visible) {
		@apply ring-0 ring-offset-0;
	}
	button:hover span {
		transition: transform 150ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
		transform: translateY(-10px);
	}
	button:focus span {
		transition: transform 150ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
		transform: translateY(-10px);
	}
	button:active span {
		transform: translateY(-4px);
		transition: transform 20ms;
	}
	button.pushed span {
		transform: translateY(-4px);
		transition: transform 20ms;
	}
</style>
