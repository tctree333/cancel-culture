<script lang="ts">
	import '../app.postcss';

	import DarkToggle from '$lib/components/DarkToggle.svelte';
</script>

<svelte:head>
	<script>
		window.setState = function () {
			const classes = document.querySelector('html').classList;
			if (
				document.cookie.split(';').some((c) => c.includes('theme=dark')) ||
				(!document.cookie.split(';').some((c) => c.startsWith('theme=')) &&
					window.matchMedia('(prefers-color-scheme: dark)').matches)
			) {
				classes.add('dark');
			} else {
				classes.remove('dark');
			}
		};
		setState();
	</script>
</svelte:head>

<div class="relative max-w-6xl mx-auto">
	<div class="absolute top-0 right-0 mr-4 max-w-max">
		<DarkToggle
			widthClass="w-16 h-16"
			class="bg-green-300 rounded-b-lg dark:bg-green-800"
			size="32"
		/>
	</div>
</div>

<main
	class="max-w-4xl min-h-full px-6 py-4 mx-auto transition duration-300 bg-gray-100 bg-opacity-30 dark:bg-gray-800 dark:bg-opacity-30"
>
	<slot />
</main>

<footer
	class="flex flex-col items-center justify-center w-full py-16 mt-20 text-gray-100 bg-gray-900 bg-tic-tac-toe-light"
>
	<p class="mb-4 text-lg">
		A web project by <a class="underline" href="https://tomichen.com">Tomi Chen.</a>
	</p>
	<p class="text-lg">
		<a class="underline" href="https://github.com/tctree333/cancel-culture"
			>View the source on GitHub.</a
		>
	</p>
</footer>
