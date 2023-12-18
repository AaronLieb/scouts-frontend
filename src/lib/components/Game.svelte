<script lang="ts">
  import Board from "#lib/components/Board.svelte";
  import BoardPlayerStatus from "#lib/components/BoardPlayerStatus.svelte";
</script>

<div class="game">
  <Board />
  <BoardPlayerStatus
    player1={{ name: "Player 1" }}
    player2={{ name: "Player 2" }}
    player1Time={100}
    player2Time={100}
  />
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
</style>
