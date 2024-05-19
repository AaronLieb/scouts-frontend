<script lang="ts">
  import { type Lobby, GameState, createNewLobby, joinLobby } from "#lib/scouts"

  export let state: GameState;
  export let lobby: Lobby;

  async function createGame() {
    lobby = await createNewLobby()
    state = GameState.InGame
    await joinLobby(lobby.join_code, 0)

  }

</script>

<div class="menu">
  <button on:click={createGame}>Create Game</button>
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
