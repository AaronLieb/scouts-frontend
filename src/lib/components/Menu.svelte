<script lang="ts">
  let createGame = () => {
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
