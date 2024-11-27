<script lang="ts">
	import type { Player } from '$lib/types';
	import { GameState } from '$lib/types';
	import { setLobby, setAuthToken, createNewGame, joinGame } from '$lib/api';

	export let state: GameState;
	export let players: Player[];
	export let gameId: string;
	export let mySide: number;

	async function join(joinCode: string, side: number) {
		await joinGame(joinCode);
		mySide = side;
		players[side] = { name: 'test', side: side, time: 100 };
		setLobby(joinCode);
		setAuthToken(players[side].name);
		state = GameState.InGame;
		gameId = joinCode;
	}

	async function createGame() {
		const response = await createNewGame();
		join(response.game_id, 1);
	}

	async function promptJoinGame() {
		let joinCode = prompt('Game ID') ?? '00000';
		join(joinCode, 2);
	}
</script>

<div class="menu">
	<button on:click={createGame}>Create Game</button>
	<button on:click={promptJoinGame}>Join Game</button>
</div>

<style lang="scss">
</style>
