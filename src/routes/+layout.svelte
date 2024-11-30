<script>
	import 'normalize.css';
	import '../app.css';
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	<link
		href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500;700;900&family=Source+Sans+3:wght@300;400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<nav>
	<a href="/">Home</a>
</nav>
<slot />
<footer>
	<div>
		<a href="/rules">Rules</a> <span> • </span>
		<a href="/credits">Credits</a> <span> • </span>
		<a href="/contact">Contact</a> <span> • </span>
		<a href="https://github.com/AaronLieb/scouts-frontend">Source Code</a> <span> • </span>
		<a href="https://discord.gg/gWhpHaup3Z">Discord</a>
	</div>
	<div>Aaron Lieberman &copy; 2024</div>
</footer>

<style lang="scss">
	nav {
		padding: 0.5rem;
		background-color: var(--background-color-lighter);
	}

	footer {
		margin: 0;
		padding: 1rem;
		left: 0;
		bottom: 0;
		width: 100%;
		text-align: center;
		font-size: 0.8rem;
		color: var(--text-color-darker);
	}

	a {
		color: inherit;
		text-decoration: none;
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
