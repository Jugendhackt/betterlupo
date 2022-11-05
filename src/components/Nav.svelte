<script>
	export let segment;
</script>

<style>
	nav {
		border-bottom: 1px solid rgba(255,62,0,0.1);
		background-color: #2B2D42;
		font-weight: 300;
		padding: 0 1em;
		display: flex;
		flex-direction: row;
		place-content: space-between;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	[aria-current] {
		position: relative;
		display: inline-block;
	}

	[aria-current]::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgb(255,62,0);
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
		color: white;
	}

	img {
		width: 30px;
	}
</style>

<nav>
	<a href="/"><img src="icons/logout.svg" alt="logout"></a>
	<a>LOGO</a>
	<a href="/help"><img src="icons/help.svg" alt="help"></a>
</nav>
