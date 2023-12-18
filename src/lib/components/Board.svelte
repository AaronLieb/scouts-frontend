<script lang="ts">
  import { type Piece } from "scouts-wasm";
  import { onMount } from "svelte";
  import "#lib/scouts.ts";

  const rows = 10;
  const cols = 8;

  let arr: (Piece | null)[] = Array(rows * cols).fill(null);
  let pieces: Piece[] = [];

  const pos_to_idx = (x: number, y: number) => {
    return y * cols + x;
  };

  $: pieces.forEach((piece) => {
    const pos = piece.position as string;
    const [x, y] = pos.split(",").map((item) => parseInt(item));
    const idx = pos_to_idx(x, y);
    arr[idx] = piece;
    arr = [...arr];
  });

  const isAlternate = (idx: number) => {
    const x = idx % cols;
    const y = Math.floor(idx / cols);
    return (x + y) % 2 === 0;
  };

  function updatePieces() {
    Scouts.boardPieces().then((res) => (pieces = res));
  }

  // Delete this once we have ways to make moves
  onMount(async () => {
    await Scouts.makeMove(1, "place_scout 0,9");
    await Scouts.makeMove(2, "place_scout 0,0");
    await Scouts.makeMove(1, "place_scout 1,9");
    await Scouts.makeMove(2, "place_scout 1,0");
    updatePieces();
  });
</script>

<div class="main">
  {#each arr as item, idx}
    {#if !item}
      <div class="cell" class:alternate={isAlternate(idx)} />
    {:else}
      <div class="cell" class:alternate={isAlternate(idx)}>{item.position}</div>
    {/if}
  {/each}
</div>

<style>
  .main {
    display: grid;
    grid-template-rows: repeat(10, 50px);
    grid-template-columns: repeat(8, 50px);
  }

  .cell {
    aspect-ratio: 1;
    background-color: var(--cell-default);
  }

  .cell.alternate {
    background-color: var(--alternate-cell-default);
  }
</style>
