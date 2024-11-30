<script lang="ts">
	import { goto } from '$app/navigation';
	import { createNewGame } from '$lib/api';

	async function createGame() {
		const response = await createNewGame();
		goto(`/game/${response.game_id}`);
	}

	async function promptJoinGame() {
		let joinCode = prompt('Game ID') ?? '00000';
		goto(`/game/${joinCode}`);
	}
</script>

<div class="container mx-auto flex justify-center space-x-5 my-5">
	<button class="red" on:click={createGame}>Create Game</button>
	<button class="blue" on:click={promptJoinGame}>Join Game</button>
</div>

<style lang="scss">
	.red {
		background-color: #f44845;
	}

	.red:hover {
		background-color: #7e2724;
	}

	.blue {
		background-color: #008fff;
	}

	.blue:hover {
		background-color: #014a88;
	}

	button {
		border: none;
		background-color: blue;
		color: white;
		font-weight: bold;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
	}

	button:hover {
		background-color: darkblue;
		cursor: pointer;
	}
</style>
