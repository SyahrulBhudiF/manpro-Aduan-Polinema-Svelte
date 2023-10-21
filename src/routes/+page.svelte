<script lang="ts">
	let hasLogin = true;
</script>

<div class="container">
	{#if hasLogin}
		<h1 class="text-red-500">Welcome to SvelteKit</h1>
		<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
	{:else}
		<h1>Welcome to SvelteKit</h1>
		<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
	{/if}
</div>
