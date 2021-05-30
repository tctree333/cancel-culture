<script lang="ts">
	import '../app.postcss';
</script>

<svelte:head>
	<script>
		window.setState = function () {
			const classes = document.querySelector('html').classList;
			if (
				localStorage.theme === 'dark' ||
				(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
			) {
				classes.add('dark');
			} else {
				classes.remove('dark');
			}
		};
		setState();
	</script>
</svelte:head>

<slot />
