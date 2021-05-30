<script lang="ts">
	export let name: string;
	export let plural: boolean;
</script>

<h1 class="mt-10 mb-8 text-6xl text-center">{name} {plural ? 'Are' : 'Is'} Cancelled!</h1>

<p class="text-lg">
	Want to cancel more? <a
		class="text-blue-800 underline dark:text-blue-300"
		href="https://iscancelled.com/">Go back to the main page.</a
	>
</p>
