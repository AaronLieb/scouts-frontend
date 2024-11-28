<script lang="ts">
	import { goto } from '$app/navigation';
	import { createNewGame, joinGame } from '$lib/api';

	async function createGame() {
		const response = await createNewGame();
		goto(`/game/${response.game_id}`);
	}

	async function promptJoinGame() {
		let joinCode = prompt('Game ID') ?? '00000';
		goto(`/game/${joinCode}`);
	}
</script>

<div class="menu">
	<button on:click={createGame}>Create Game</button>
	<button on:click={promptJoinGame}>Join Game</button>
</div>

<style lang="scss">
</style>
