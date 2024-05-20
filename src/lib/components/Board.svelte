<script lang="ts">
  import { onMount } from "svelte";

  import type { Player, Piece } from "#lib/types";
  import { getBoard, placePiece } from "#lib/api";
  import Cell from "#lib/components/Cell.svelte";

  export let currentTurn: number;
  export let player: Player;

  const LENGTH = 10;
  const WIDTH = 8;

  // poll every 5 seconds
  const POLL_DELAY = 5 * 1000;

  let phase = "setup";
  let selectedPieceIdx: number;

  onMount(subscribe);

  function subscribe() {
    setInterval(updateBoard, POLL_DELAY);
  }

  function getRow(idx: number) {
    return Math.floor(idx / WIDTH);
  }

  function switchTurns() {
    currentTurn = currentTurn == 1 ? 2 : 1;
  }

  function parseBoardState(boardState: string) {
    let parsed = JSON.parse(boardState);
    boardArr = parsed.state.map((x: any) => {
      if (x === null) return {};
      else return { player: x.player };
    });
    phase = parsed.phase;
    switchTurns();
    return parsed;
  }

  async function updateBoard() {
    let response = await getBoard();
    parseBoardState(response.board);
  }

  async function handlePlacePiece(idx: number) {
    if (player.side === 1 && getRow(idx) !== 0) return;
    if (player.side === 2 && getRow(idx) !== LENGTH - 1) return;
    let response = await placePiece(idx % WIDTH);
    console.log(parseBoardState(response.board));
  }

  function handleSelectPiece(idx: number) {
    if (selectedPieceIdx === null) {
      selectedPieceIdx = idx;
      boardArr[idx].selected = true;
      console.log("selected new piece");
    } else {
      boardArr[selectedPieceIdx].selected = false;
      boardArr[idx].selected = true;
      selectedPieceIdx = idx;
      console.log("changed selected piece");
    }
  }

  function handleMovePiece(idx: number) {
    // returns true/false if valid/invalid
    return false;
  }

  function handleCellClick(idx: number) {
    if (currentTurn != player.side) return;
    if (phase === "setup") return handlePlacePiece(idx);
    if (selectedPieceIdx === null) return handleSelectPiece(idx);
    if (!handleMovePiece(idx)) {
      handleSelectPiece(idx);
    }
  }

  let boardArr: Piece[] = Array(LENGTH * WIDTH).fill({});
</script>

<div class="main">
  {#each boardArr as piece, idx}
    <Cell
      alternate={(idx + Math.floor(idx / WIDTH)) % 2 == 0}
      {piece}
      on:click={() => handleCellClick(idx)}
    />
  {/each}
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
