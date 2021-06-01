<script lang="ts">
	import { page } from '$app/stores';
	import Favicons from './Favicons.svelte';

	interface PageImage {
		url: string;
		type: string;
		alt: string;
	}
	export let title: string;
	export let description: string;
	export let index = true;
	export let pageImage: PageImage | undefined = undefined;

	let url = fullUrl($page.path);

	function fullUrl(value: string) {
		let root = 'https://' + $page.host;
		if (value.startsWith(root)) {
			return value;
		}
		return root + (value.startsWith('/') ? '' : '/') + value;
	}

	if (pageImage) {
		pageImage.url = fullUrl(pageImage.url);
	}
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<!-- Allow search engines to crawl certain pages -->
	{#if index === false}
		<meta name="robots" content="none" />
		<meta name="googlebot" content="none" />
	{:else}
		<meta name="robots" content="index, follow" />
		<meta name="googlebot" content="index, follow" />
	{/if}

	<!-- Social cards (twitter, open graph) -->
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:locale" content="en_US" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={url} />

	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:domain" content="funwithmeth.com" />
	<meta name="twitter:url" content={url} />

	{#if pageImage}
		<meta name="twitter:card" content="summary_large_image" />

		<meta property="og:image" content={pageImage.url} />
		<meta property="og:image:type" content={pageImage.type} />
		<meta property="og:image:alt" content={pageImage.alt} />

		<meta name="twitter:image" content={pageImage.url} />
		<meta name="twitter:image:alt" content={pageImage.alt} />
	{/if}

	<!-- Other assorted tags -->
	<meta name="twitter:dnt" content="on" />
	<meta name="pinterest" content="nopin" />
	<meta name="format-detection" content="telephone=no" />
	<meta name="skype_toolbar" content="skype_toolbar_parser_compatible" />
	<meta http-equiv="x-ua-compatible" content="ie=edge" />

	<Favicons />
</svelte:head>
