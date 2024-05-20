<script lang="ts">
  import Avatar from "#lib/components/Avatar.svelte";
  import Triangle from "#lib/components/svg/Triangle.svelte";
  import type { Player } from "#lib/scouts";

  export let player1: Player;
  export let player2: Player;

  export let player1Time: number;
  export let player2Time: number;

  export let currentTurn: number;

  function formatElapsedTime(time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
</script>

<div class="board-player-status">
  <div class="player player1" class:current={currentTurn == 1}>
    <Avatar url={player1.avatar} name={player1.name} size="2.5rem" />
    <div>
      <span class="name">{player1.name}</span>
      <span class="time">{formatElapsedTime(player1Time)}</span>
    </div>
  </div>

  <div
    class="turn-triangle"
    class:player1={currentTurn == 1}
    class:player2={currentTurn == 2}
  >
    <Triangle
      fill={currentTurn == 1
        ? "var(--red-player-fill)"
        : "var(--blue-player-fill)"}
      stroke={currentTurn == 1
        ? "var(--red-player-border)"
        : "var(--blue-player-border)"}
    />
  </div>

  <div class="player player2" class:current={currentTurn === 2}>
    <Avatar url={player2.avatar} name={player2.name} size="2.5rem" />
    <div>
      <span class="name">{player2.name}</span>
      <span class="time">{formatElapsedTime(player2Time)}</span>
    </div>
  </div>
</div>

<style lang="scss">
  .board-player-status {
    background-color: var(--background-color-lighter);
    border: var(--stroke-width) solid var(--stroke-color);
    border-radius: var(--border-radius);

    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
  }

  .player {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: var(--inline-margin);
    gap: var(--inline-margin-half);

    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    &.current .name {
      font-weight: 800;
    }

    .time {
      font-size: 0.9em;
      font-weight: 400;
      line-height: 1;
    }

    &.player2 {
      flex-direction: row-reverse;

      div {
        align-items: flex-end;
      }
    }
  }

  .turn-triangle {
    :global(svg) {
      --player1-angle: -90deg;

      width: 2rem;
      height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    :global(svg),
    :global(svg *) {
      transition: all var(--transition-short) ease-in-out;
    }

    &.player1 :global(svg) {
      transform: rotate(var(--player1-angle));
    }

    &.player2 :global(svg) {
      transform: rotate(calc(var(--player1-angle) + 180deg));
    }
  }

  @media (max-width: 600px) {
    .board-player-status {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr auto 1fr;
    }

    .player {
      padding: var(--inline-margin-half);
      &.player1,
      &.player2 {
        flex-direction: row;
        div {
          align-items: flex-start;
        }
      }
    }

    .turn-triangle :global(svg) {
      --player1-angle: 0deg;
      width: 3em;
      margin: var(--inline-margin-half);
    }
  }
</style>
