<script lang="ts">
	import Menu from '$lib/components/Menu.svelte';
</script>

<main>
	<div>
		<h1>Scouts</h1>
		<Menu />
	</div>
</main>

<style lang="scss">
	h1 {
		font-size: 5rem;
	}

	div {
		min-height: 80vw;
		max-width: fit-content;
		margin: auto;
		padding: 5rem;
	}
</style>
