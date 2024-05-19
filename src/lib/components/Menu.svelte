<script lang="ts">
  import {
    type Lobby,
    GameState,
    createNewLobby,
    joinLobby,
  } from "#lib/scouts";

  export let state: GameState;
  export let lobby: Lobby;

  async function createGame() {
    lobby = await createNewLobby();
    console.log(lobby.join_code);
    await joinLobby(lobby.join_code, 1);
    state = GameState.InGame;
  }

  async function joinGame() {
    let joinCode = prompt("Game ID") ?? "00000";
    await joinLobby(joinCode, 2);
    state = GameState.InGame;
  }
</script>

<div class="menu">
  <button on:click={createGame}>Create Game</button>
  <button on:click={joinGame}>Join Game</button>
</div>

<style lang="scss">
</style>
