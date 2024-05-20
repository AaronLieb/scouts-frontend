<script lang="ts">
  import type { Player } from "#lib/types";
  import { GameState } from "#lib/types";
  import { setLobby, setAuthToken, createNewLobby, joinLobby } from "#lib/api";

  export let state: GameState;
  export let player: Player;

  async function join(joinCode: string, side: number) {
    const response = await joinLobby(joinCode, side);
    player = { name: "test", side: side };
    setLobby(joinCode);
    setAuthToken(response.player_id);
    state = GameState.InGame;
  }

  async function createGame() {
    const response = await createNewLobby();
    join(response.join_code, 1);
  }

  async function joinGame() {
    let joinCode = prompt("Game ID") ?? "00000";
    join(joinCode, 2);
  }
</script>

<div class="menu">
  <button on:click={createGame}>Create Game</button>
  <button on:click={joinGame}>Join Game</button>
</div>

<style lang="scss">
</style>
