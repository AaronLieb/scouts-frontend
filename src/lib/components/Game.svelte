<script lang="ts">
	import Menu from '$lib/components/Menu.svelte';
	import Board from '$lib/components/Board.svelte';
	import BoardPlayerStatus from '$lib/components/BoardPlayerStatus.svelte';
	import type { Player } from '$lib/types';
	import { GameState } from '$lib/types';

	let state: GameState = GameState.Menu;
	let players: Player[] = [
		{ name: 'Player 1', side: 1, time: 100 },
		{ name: 'Player 2', side: 2, time: 100 }
	];
	let mySide: number;
	let currentTurn: number = 1;
	let gameId: string;
</script>

<div class="game">
	{#if state == GameState.Menu}
		<Menu bind:mySide bind:players bind:state bind:gameId />
	{:else if state == GameState.InGame}
		<Board bind:mySide bind:players bind:currentTurn />
		<BoardPlayerStatus bind:currentTurn bind:players />
		<span class="gameId">{gameId}</span>
	{/if}
</div>

<style lang="scss">
	.game {
		display: grid;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		grid-gap: calc(var(--inline-margin) / 2);
	}
	.gameId {
		color: white;
	}
</style>
