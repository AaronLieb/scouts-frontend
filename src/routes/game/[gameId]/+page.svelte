<script lang="ts">
	import Game from '$lib/components/Game.svelte';

	let { data }: { data: { gameId: string } } = $props();
</script>

<main>
	<Game gameId={data.gameId} />
</main>
