<script lang="ts">
  import Game from "#lib/components/Game.svelte";
  import Menu from "#lib/components/Menu.svelte";
  let state = 0;
</script>

<main>
  {#if state == 0}
    <Menu />
  {/if}
  {#if state == 1}
  <Game />
  {/if}
</main>

<style lang="scss">
</style>
