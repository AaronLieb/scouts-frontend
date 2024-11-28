<script lang="ts">
	import { gameInfo, joinGame } from '$lib/api';
	import Board from '$lib/components/Board.svelte';
	import BoardPlayerStatus from '$lib/components/BoardPlayerStatus.svelte';
	import type { Player } from '$lib/types';
	import { onMount } from 'svelte';

	let players: Player[] = $state([
		{ name: 'Waiting for player 1', side: 1, time: 100 },
		{ name: 'Waiting for player 2', side: 2, time: 100 }
	]);
	let mySide: number = $state(1);
	let currentTurn: number = $state(1);
	let { gameId } = $props();

	onMount(async () => {
		const info = await gameInfo(gameId);
		if (info.player_a) {
			players[0].name = info.player_a.user_id ?? 'Player 1';
		}
		if (info.player_b) {
			players[1].name = info.player_b.user_id ?? 'Player 2';
		}

		if (!info.player_a) {
			mySide = 1;
			await joinGame(gameId);
			players[0].name = 'Player 1';
		} else if (!info.player_b) {
			mySide = 2;
			await joinGame(gameId);
			players[1].name = 'Player 2';
		}
	});
</script>

<div class="game">
	<Board bind:gameId bind:mySide bind:players bind:currentTurn />
	<BoardPlayerStatus bind:currentTurn bind:players />
	<span class="gameId">{gameId}</span>
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
