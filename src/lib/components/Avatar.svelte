<script lang="ts">
  export let url: string | undefined = undefined;
  export let name: string | undefined = undefined;
  export let size = "2rem";
  export let border = "#2c2828";
</script>

<div class="avatar" style="--size: {size}; --border: {border};">
  {#if url}
    <img src={url} alt="{name}'s avatar" />
  {:else}
    <div class="placeholder"></div>
  {/if}
</div>

<style lang="scss">
  .avatar {
    border-radius: 50%;
    border: var(--stroke-width) solid var(--border);
    transition: all var(--transition-short) ease-in-out;
    overflow: hidden;

    .placeholder,
    img {
      width: var(--size);
      height: var(--size);
      aspect-ratio: 1;
    }
    .placeholder {
      background-color: #71d69f;
      background-image: linear-gradient(to bottom, #71d69f, #bc71d6);
    }
  }
</style>
