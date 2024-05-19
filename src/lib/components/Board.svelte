<script lang="ts">
  import { onMount } from "svelte";
  import { type Piece, type Lobby } from "#lib/scouts";
  import Cell from "#lib/components/Cell.svelte"

  export let lobby: Lobby;

  const LENGTH = 10
  const WIDTH = 8

  function handleCellClick(idx: number) {

  }

  let boardArr: Piece[] = Array(LENGTH * WIDTH).fill({})
</script>


<div class="main">
  {#each boardArr as piece, idx}
    <Cell
      piece={piece}
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

  .cell {
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1;
    background-color: var(--cell-default);

    border: none;
    outline: none;

    user-select: none;
    cursor: pointer;

    &.alternate {
      background-color: var(--alternate-cell-default);
    }
  }

  .piece {
    width: calc(var(--cell-size) * 0.65);
    position: absolute;
    aspect-ratio: 1;
    background-color: var(--red-player-fill);
    border-radius: 50%;
    border: var(--stroke-width) solid gray;
  }

  .red {
    background-color: var(--red-player-fill);
    border: var(--stroke-width) solid var(--red-player-border);
  }

  .blue {
    background-color: var(--blue-player-fill);
    border: var(--stroke-width) solid var(--blue-player-border);
  }
</style>
