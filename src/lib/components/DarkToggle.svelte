<script lang="ts">
	import { page } from '$app/stores';

	function toggle() {
		document.cookie = `theme=${
			document.cookie.split(';').some((c) => c.includes('theme=dark')) ? 'light' : 'dark'
		}; SameSite=None; Secure; Domain=${$page.host.split('.').slice(-2).join('.')}; Path=/`;
		//@ts-ignore
		window.setState();
	}
	export let size: string | number;
	export let widthClass: string;
	let className: string;
	export { className as class };
</script>

<div class="relative block">
	<button
		tabindex="0"
		class="absolute top-0 left-0 opacity-0 cursor-pointer outline-none {widthClass}"
		type="button"
		id="dark-toggle"
		on:click={toggle}
	>
		<span class="sr-only">Toggle Dark Mode</span>
	</button>
	<div aria-hidden="true" class="{className} {widthClass} flex items-center justify-center">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 20 20"
			fill="currentColor"
			width={size}
			height={size}
			class="hidden dark:block"
		>
			<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
		</svg>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 20 20"
			fill="currentColor"
			width={size}
			height={size}
			class="block dark:hidden"
		>
			<path
				fill-rule="evenodd"
				d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
				clip-rule="evenodd"
			/>
		</svg>
	</div>
</div>

<style lang="postcss">
	button:focus-visible + div {
		@apply ring-4 ring-offset-4;
	}
	:global(.dark) button:focus-visible + div {
		@apply ring-offset-gray-800 ring-blue-300;
	}
</style>
