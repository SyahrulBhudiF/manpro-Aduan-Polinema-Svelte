<script lang="ts">
	import { navigate } from '../../node_modules/svelte-routing';
	import { onMount } from 'svelte';

	onMount(() => {
		navigate('/login');
	});
</script>
