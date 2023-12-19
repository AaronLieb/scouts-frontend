<script lang="ts">
  import { type Player, type Piece, type Move } from "scouts-wasm";
  import { onMount } from "svelte";
  import { makeMove as _makeMove, pieces, currentTurn } from "#lib/scouts";

  const makeMove = (player: Player | undefined, move: Move) => {
    if (!player) throw new Error("Unable to determine player turn.")
    arr = Array(80).fill(null);
    _makeMove(player, move);
    console.log($pieces);
  }

  const rows = 10;
  const cols = 8;

  let arr: (Piece | null)[] = Array(rows * cols).fill(null);

  const pos_to_idx = (x: number, y: number) => {
    return y * cols + x;
  };

  const idx_to_pos = (idx: number) => {
    return { x: idx % cols, y: Math.floor(idx / cols) };
  };

  $: $pieces.forEach((piece) => {
    let x, y;
    switch (piece.kind) {
      case "scout":
        [x, y] = piece.position;
        break;
      case "boulder":
        [x, y] = piece.position[0];
        break;
    }
    const idx = pos_to_idx(x, y);
    arr[idx] = piece;
  });
  $: player = $currentTurn?.player;

  const isAlternate = (idx: number) => {
    const x = idx % cols;
    const y = Math.floor(idx / cols);
    return (x + y) % 2 === 0;
  };

  // Delete this once we have ways to make moves

  const handleCellClick = (idx: number) => {
    const pos = idx_to_pos(idx);

    const is_piece = arr[idx] != null;
    let action = "";
    const params = [];

    if (is_piece) {
      const _piece = arr[idx];

      if (!_piece) throw new Error("Piece is null. Shouldn't be here.");

      console.log("Clicked a piece:", _piece);

      if (_piece.player == player) action = "click_friendly_piece";
      else if (_piece.player != player) action = "click_enemy_piece";
      params.push(_piece);
    } else {
      console.log(`Clicked ${pos.x}, ${pos.y}`);
      action = "click_empty_cell";
      params.push(...[pos.x, pos.y]);
    }

    let next_state = state_transitions[current_state];
    if (!next_state) {
      console.log(
        `There is no state called ${current_state} in state_transitions: ${Object.keys(
          state_transitions,
        )}`,
      );
      next_state = {};
      next_state[action] = () => {
        return current_state;
      }; // nop, basically
    }

    const state_function = next_state[action];

    if (!state_function) {
      console.log(
        `Undefined state transition from ${current_state} with action ${action} and params ${params}\n` +
          `The valid states from ${current_state} are:\n${state_transitions[current_state]}`,
      );
    }

    current_state = state_function(...params);
  };

  let current_state = "placing_scouts";
  let selected_piece: Piece | null;

  type DFA = {
    [key: string]: StateTransition;
  };

  type StateTransition = {
    [key: string]: (...args: any[]) => string;
  };

  $: console.log(current_state)
  const state_transitions: DFA = {
    placing_scouts: {
      click_empty_cell: (x: number, y: number) => {
        makeMove($currentTurn?.player, `place_scout ${x},${y}` as Move);
        return ($pieces.length == 9) ? "turn_start" : "placing_scouts"
      }
    },
    turn_start: {
      click_enemy_piece: (_piece: Piece) => {
        return "turn_start";
      },
      click_friendly_piece: (_piece: Piece) => {
        selected_piece = _piece;
        console.log("clicked friendly");
        return "piece_selected";
      },
      click_empty_cell: (x: number, y: number) => {
        makeMove($currentTurn?.player, `boulder ${[x,y].join()}` as Move)
        return "turn_start"
      }
    },

    piece_selected: {
      click_friendly_piece: (_piece: Piece) => {
        if (selected_piece === _piece) {
          selected_piece = null;
          return "turn_start"
        }
        else {
          selected_piece = _piece;
          return "piece_selected";
        }
      },
      click_enemy_piece: (_piece: Piece) => {
        selected_piece = null;
        return "turn_start";
      },
      click_empty_cell: (x: number, y: number) => {
        if (selected_piece == null) throw new Error("Expected selected piece.")
        const move = `${selected_piece.position.join()} ${x},${y}` as Move
        let moveType = "dash"
        if (
          Math.abs(selected_piece.position[0] as number - x) > 1 || 
          Math.abs(selected_piece.position[1] as number - y) > 1
        ) {
          moveType = "jump"
        }
        makeMove($currentTurn?.player, `${moveType} ${move}` as Move);
        console.log(`clicked empty cell after selecting piece: (${x}, ${y})`);
        return "turn_start";
      },
    },
  };

  $: console.log("Current state: ", current_state);

  onMount(async () => {});
</script>

<div class="main">
  {#each arr as piece, idx}
    <button
      class="cell"
      class:alternate={isAlternate(idx)}
      on:click={() => handleCellClick(idx)}
    >
      <span class:piece class:red={piece?.player == 1} class:blue={piece?.player == 2}/>
    </button>
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
