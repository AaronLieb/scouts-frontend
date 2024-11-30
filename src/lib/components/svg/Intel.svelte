<script lang="ts">
	let { player } = $props();
</script>

<svg
	class:red={player == 1}
	class:blue={player == 2}
	width="37"
	height="42"
	viewBox="0 0 37 42"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path d="M33.4909 4.66263L11.3915 38.1927" stroke-width="5.8147" stroke-linecap="round" />
	<circle cx="32.0241" cy="29.4518" r="4.97593" />
	<path
		d="M13.3091 3.84334L15.3566 13.0089C15.9661 15.7373 14.3462 18.4685 11.6598 19.2421L6.85739 20.6249C4.17563 21.3971 2.55588 24.1207 3.15781 26.8458L4.88009 34.6428"
		stroke-width="5.8147"
		stroke-linecap="round"
	/>
</svg>

<style lang="scss">
	svg {
		z-index: 999;
		transform: scale(0.65);
	}

	.blue {
		stroke: var(--blue-player-border);

		circle {
			fill: var(--blue-player-border);
		}
	}

	.red {
		stroke: var(--red-player-border);

		circle {
			fill: var(--red-player-border);
		}
	}
</style>
