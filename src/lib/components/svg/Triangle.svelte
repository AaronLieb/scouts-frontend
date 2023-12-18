<script lang="ts">
  export let fill = "currentColor";
  export let stroke = "currentColor";
  let className = "";
  export { className as class };
</script>

<svg
  width="28"
  height="26"
  viewBox="-2 -3 32 32"
  xmlns="http://www.w3.org/2000/svg"
  style="--fill: {fill}; --stroke: {stroke};"
  class={className}
>
  <path
    d="M9.52571 2.49182C11.4502 -0.841513 16.2615 -0.841512 18.186 2.49182L27.0257 17.8027C28.9502 21.136 26.5446 25.3027 22.6956 25.3027H5.01609C1.16709 25.3027 -1.23854 21.136 0.685962 17.8027L9.52571 2.49182Z"
    stroke-width="2"
  />
</svg>

<style>
  svg > path {
    fill: var(--fill);
    stroke: var(--stroke, var(--stroke-color));
    stroke-width: var(--stroke-width);
  }
</style>
