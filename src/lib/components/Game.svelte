<script lang="ts">
  import Menu from "#lib/components/Menu.svelte";
  import Board from "#lib/components/Board.svelte";
  import BoardPlayerStatus from "#lib/components/BoardPlayerStatus.svelte";
  import type { Player } from "#lib/types";
  import { GameState } from "#lib/types";

  let state: GameState = GameState.Menu;
  let player: Player;
  let currentTurn: number = 1;
</script>

<div class="game">
  {#if state == GameState.Menu}
    <Menu bind:player bind:state />
  {:else if state == GameState.InGame}
    <Board bind:player bind:currentTurn />
    <BoardPlayerStatus
      bind:currentTurn
      player1={{ name: "Player 1", side: 1 }}
      player2={{ name: "Player 2", side: 2 }}
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
