<script lang="ts">
	import { onMount } from 'svelte';
	import * as validator from 'scouts-wasm';
	import wasmURL from 'scouts-wasm/dist/main.wasm?url';

	import type * as scoutswasm from 'scouts-wasm';
	import type { Piece } from '$lib/types.ts';
	import type { PlayerJoinedEvent, TurnBeginEvent, MoveMadeEvent } from '$lib/events.ts';
	import { Point } from '$lib/types.ts';
	import Cell from './Cell.svelte';
	import { BOARD_LENGTH, BOARD_WIDTH } from '$lib/constants.ts';
	import { subscribe, makeMove } from '$lib/api.ts';

	let {
		mySide = $bindable(),
		gameId = $bindable(),
		currentTurn = $bindable(),
		players = $bindable()
	} = $props();

	let boardArr: Piece[] = $state(
		Array(BOARD_LENGTH * BOARD_WIDTH).fill({
			selected: false,
			possible: false
		})
	);

	let boardArrReversed: Piece[] = $derived(boardArr.toReversed());

	let phase = 'setup';
	let selectedPiece: Point | null = null;
	let turnCount = 0;

	onMount(async () => {
		// this should be loaded in the background on website startup probably, or a add a loading symbol
		await validator.load(wasmURL);
		validator.resetGame();
		subscribe(gameId, onPlayerJoin, onTurnBegin, onMoveMade);
	});

	/*
	 * Event Handlers
	 */

	function onPlayerJoin(ev: PlayerJoinedEvent) {
		console.log('Player joined', ev);
	}

	function onTurnBegin(ev: TurnBeginEvent) {
		console.log('Turn Begin', ev);
		currentTurn = ev.player_side;
	}

	function onMoveMade(ev: MoveMadeEvent) {
		console.log('Move Made', ev);
		turnCount += 1;
		if (turnCount >= 10) {
			phase = 'started';
		}
		validator.makeMove(ev.player_side, ev.move);
		resetBoard();
		for (let piece of validator.boardPieces()) {
			if (piece.kind == 'scout') {
				const position = piece.position as [number, number];
				const idx = position[1] * BOARD_WIDTH + position[0];
				boardArr[idx] = {
					player: piece.player,
					type: piece.kind,
					intel: piece.returning,
					selected: false,
					possible: false
				};
			}
		}

		players[0].time = +ev.time_remaining[0].slice(0, -1);
		players[1].time = +ev.time_remaining[1].slice(0, -1);
	}

	/*
	 * Client side handlers
	 */

	function handleCellClick(p: Point) {
		console.log('handleCellClick');
		if (currentTurn != mySide) return;
		// During setup phase, render the possible moves before selecting a piece
		if (phase === 'setup') placePiece(p);
		// After setup, only render possible moves once a piece is selected
		else if (selectedPiece === null) selectPiece(p);
		else if (p.x == selectedPiece.x && p.y == selectedPiece.y) {
			unselectPiece();
		} else if (!movePiece(p)) {
			selectPiece(p);
		}
	}

	function resetBoard() {
		for (const i in boardArr) {
			boardArr[i] = {
				intel: false,
				selected: false,
				possible: false
			};
		}
	}

	function unselectPiece() {
		if (selectedPiece) {
			boardArr[selectedPiece.id].selected = false;
			selectedPiece = null;
			showPossibleMoves();
		}
	}

	function showPossibleMoves() {
		const possibleMoves = validator.possibleMoves(mySide as scoutswasm.Player).moves;

		boardArr.forEach((c) => (c.possible = false));
		if (!selectedPiece) {
			return;
		}
		for (const move of possibleMoves) {
			const split = move.split(' ');
			if (split.length < 3) {
				continue;
			}

			const before = new Point(split[1]);
			const after = new Point(split[2]);

			if (!selectedPiece.equals(before)) {
				continue;
			}

			boardArr[after.id].possible = true;
		}
	}

	async function placePiece(p: Point) {
		console.log('HandlePlacePiece');

		const moveString = `place_scout ${p.x},${p.y}`;
		console.log('moveString', moveString);
		const possibleMoves = validator.possibleMoves(mySide as scoutswasm.Player);
		console.log('Possible Moves', possibleMoves);
		if (!possibleMoves.moves.includes(moveString as scoutswasm.Move)) {
			console.log('INVALID MOVE');
			return;
		}
		console.log('VALID MOVE');
		await makeMove(gameId, moveString);
	}

	// todo: show list of possible moves after selecting a piece.
	function selectPiece(p: Point) {
		console.log('HandleSelectPiece');
		if (selectedPiece === null) {
			selectedPiece = p;
			boardArr[p.id].selected = true;
			console.log('selected new piece');
		} else {
			boardArr[selectedPiece.id].selected = false;
			boardArr[p.id].selected = true;
			selectedPiece = p;
			console.log('changed selected piece');
		}

		showPossibleMoves();
	}

	async function movePiece(p: Point) {
		let moveType = 'dash';

		if (selectedPiece == null) {
			return;
		}

		if (Math.abs(selectedPiece.x - p.x) > 1 || Math.abs(selectedPiece.y - p.y) > 1) {
			moveType = 'jump';
		}

		const moveString = `${moveType} ${selectedPiece.x},${selectedPiece.y} ${p.x},${p.y}`;
		console.log('moveString', moveString);
		const possibleMoves = validator.possibleMoves(mySide as scoutswasm.Player);
		console.log('Possible Moves', possibleMoves);
		if (!possibleMoves.moves.includes(moveString as scoutswasm.Move)) {
			console.log('INVALID MOVE');
			return false;
		}
		console.log('VALID MOVE');

		unselectPiece();
		await makeMove(gameId, moveString);

		if (moveType == 'jump') {
			selectPiece(p);
		}

		return true;
	}

	resetBoard();
</script>

<div class="main">
	{#if mySide == 1}
		{#each boardArr as piece, idx}
			<Cell
				alternate={(idx + Math.floor(idx / BOARD_WIDTH)) % 2 == 0}
				{piece}
				onclick={() => handleCellClick(new Point(idx))}
			/>
		{/each}
	{/if}
	{#if mySide == 2}
		{#each boardArrReversed as piece, idx}
			<Cell
				alternate={(idx + Math.floor(idx / BOARD_WIDTH)) % 2 == 0}
				{piece}
				onclick={() => handleCellClick(new Point(BOARD_WIDTH * BOARD_LENGTH - idx - 1))}
			/>
		{/each}
	{/if}
</div>

<style lang="scss">
	/* TODO: DONT HARDCODE RANDOM PIXEL VALUES LOL */
	.main {
		--cell-size: min(calc(100vw / 10), 65px);

		display: grid;
		grid-template-rows: repeat(10, var(--cell-size));
		grid-template-columns: repeat(8, var(--cell-size));
		background-color: var(--background-color-lighter);
		border: var(--stroke-width) solid var(--stroke-color);
		border-radius: var(--border-radius);
		overflow: hidden;
		width: min-content;
	}
</style>
