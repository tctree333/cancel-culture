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
	import '../app.postcss';

	import DarkToggle from '$lib/components/DarkToggle.svelte';
	import Head from '$lib/components/Head.svelte';

	export let main: boolean;
	export let plural: boolean;
	export let name: string;

	let title = main ? 'Cancel Anything!' : `${name} ${plural ? 'Are' : 'Is'} Cancelled!`;
	let description = main
		? ''
		: `${name} ${plural ? 'are' : 'is'} cancelled! ` +
		  `What terrible things did they do? Who knows! All we know is that ` +
		  `${name} ${plural ? 'are' : 'is'} cancelled, and they probably deserve it! ` +
		  `Join us as we celebrate the #${name.split(' ').join('')}${plural ? 'Are' : 'Is'}OverParty!`;
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

<Head {title} {description} index={main} />

<div class="relative max-w-6xl mx-auto">
	<div class="absolute top-0 right-0 mr-4 max-w-max">
		<DarkToggle
			widthClass="w-16 h-16"
			class="bg-green-300 rounded-b-lg dark:bg-green-800"
			size="32"
		/>
	</div>
</div>

<main class="max-w-4xl min-h-full px-6 py-4 mx-auto">
	<slot />
</main>

<footer
	class="flex flex-col items-center justify-center w-full py-16 mt-20 text-gray-100 bg-gray-900 "
>
	<p class="text-lg">
		A web project by <a class="underline" href="https://tomichen.com">Tomi Chen.</a>
	</p>
</footer>
