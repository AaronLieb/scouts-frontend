<script lang="ts">
  import { type Piece } from "scouts-wasm";
  import { onMount } from "svelte";
  import "#lib/scouts.ts";

  const rows = 10;
  const cols = 8;
  let player = 1; // TODO: don't hardcode this, get info from backend

  let arr: (Piece | null)[] = Array(rows * cols).fill(null);
  let pieces: Piece[] = [];

  const pos_to_idx = (x: number, y: number) => {
    return y * cols + x;
  };

  const idx_to_pos = (idx: number) => {
    return { x: idx % cols, y: Math.floor(idx / cols) };
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

  const handleCellClick = (idx: number) => {
    const pos = idx_to_pos(idx);

    const is_piece = arr[idx] != null;
    let action = "";
    const params = [];

    if (is_piece) {
      const _piece = arr[idx];

      if (!_piece) throw new Error("Piece is null. Shouldn't be here.");

      console.log(`Clicked a piece: ${_piece}`);

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

  let current_state = "turn_start";

  type DFA = {
    [key: string]: StateTransition;
  };

  type StateTransition = {
    [key: string]: (...args: any[]) => string;
  };

  const state_transitions: DFA = {
    turn_start: {
      click_enemy_piece: (_piece: Piece) => {
        return "turn_start";
      },
      click_friendly_piece: (_piece: Piece) => {
        console.log("clicked friendly");
        return "piece_selected";
      },
      click_empty_cell: () => {
        return "turn_start";
      } /* TODO: boulder stuff on empty cell click */,
    },

    piece_selected: {
      click_friendly_piece: (_piece: Piece) => {
        return "turn_start";
      },
      click_empty_cell: (x: number, y: number) => {
        console.log(`clicked empty cell after selecting piece: (${x}, ${y})`);
        return "todo";
      },
    },
  };

  $: console.log("Current state: ", current_state);

  onMount(async () => {});
</script>

<div class="main">
  {#each arr as piece, idx}
    <div
      class="cell"
      class:alternate={isAlternate(idx)}
      on:click={() => handleCellClick(idx)}
    >
      <span class:piece />
    </div>
  {/each}
</div>

<style>
  /* TODO: DONT HARDCODE RANDOM PIXEL VALUES LOL */
  .main {
    display: grid;
    grid-template-rows: repeat(10, 50px);
    grid-template-columns: repeat(8, 50px);
  }

  .cell {
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1;
    background-color: var(--cell-default);
  }

  .piece {
    width: 40px;
    position: absolute;
    aspect-ratio: 1;
    background-color: var(--red-player-fill);
    border-radius: 50%;
    border: 4px solid var(--red-player-border);
  }

  .cell.alternate {
    background-color: var(--alternate-cell-default);
  }
</style>
