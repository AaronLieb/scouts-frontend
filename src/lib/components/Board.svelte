<script lang="ts">
  import { type Piece } from "scouts-wasm";
  const rows = 10;
  const cols = 8;
  const arr = Array(rows * cols).fill("A");

  const pieces: Piece[] = [
    { kind: "scout", player: 1, position: "2,3", returning: false },
  ];

  const pos_to_idx = (x, y) => {
    return y * rows + x;
  };

  pieces.forEach((piece) => {});
</script>

<div class="main">
  {#each arr as item}
    <div class="cell">{item}</div>
  {/each}
</div>

<style>
  .main {
    display: grid;
    grid-template-rows: repeat(10, 30px);
    grid-template-columns: repeat(8, 30px);
  }

  .cell {
    width: 40;
    aspect-ratio: 1;
    background-color: yellow;
    border: 2px dotted black;
    color: black;
  }
</style>
