<script lang="ts">
  import { type Piece } from "#lib/scouts"
  export let piece: Piece;
</script>

<button class="cell">
      <span class:red={piece?.player == 1} class:blue={piece?.player == 2}/>
</button>

<style lang="scss">
</style>
