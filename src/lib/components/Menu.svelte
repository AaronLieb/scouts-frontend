<script lang="ts">
  import type { Player } from "#lib/types";
  import { GameState } from "#lib/types";
  import { setLobby, setAuthToken, createNewGame, joinGame } from "#lib/api";

  export let state: GameState;
  export let player: Player;

  async function join(joinCode: string, side: number) {
    await joinGame(joinCode);
    player = { name: "test", side: side };
    setLobby(joinCode);
    setAuthToken(player.name);
    state = GameState.InGame;
  }

  async function createGame() {
    const response = await createNewGame();
    join(response.game_id, 1);
  }

  async function promptJoinGame() {
    let joinCode = prompt("Game ID") ?? "00000";
    join(joinCode, 2);
  }
</script>

<div class="menu">
  <button on:click={createGame}>Create Game</button>
  <button on:click={promptJoinGame}>Join Game</button>
</div>

<style lang="scss">
</style>
