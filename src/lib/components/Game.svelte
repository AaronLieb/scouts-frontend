<script lang="ts">
  import Menu from "#lib/components/Menu.svelte"
  import Board from "#lib/components/Board.svelte";
  import BoardPlayerStatus from "#lib/components/BoardPlayerStatus.svelte";
  import { GameState, type Lobby } from "#lib/scouts"

  let state: GameState = GameState.Menu;
  let lobby: Lobby = {
    id: 0,
    join_code: 0
  };
</script>

<div class="game">
  {#if state == GameState.Menu}
    <Menu bind:state bind:lobby />
  {:else if state == GameState.InGame}
    <Board />
    <BoardPlayerStatus
      player1={{ name: "Player 1" }}
      player2={{ name: "Player 2" }}
      player1Time={100}
      player2Time={100}
    />
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
</style>
