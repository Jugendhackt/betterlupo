<script>
	export let segment;
</script>

<style>
	nav {
		background-color: #2B2D42;
		font-weight: 300;
		display: flex;
		flex-direction: row;
		place-content: space-between;
		
	}

	a {
		text-decoration: none;
		padding: 1em 2em;
		display: block;
		color: white;
	}

	img {
		width: 30px;
	}

	.logo {
		width : 120px;
	}
</style>

<nav>
	<a href="/"><img src="icons/logout.svg" alt="logout"></a>
	<a><img class="logo" src="logo.png" alt="betterLuPo"></a>
	<a href="/help"><img src="icons/help.svg" alt="help"></a>
</nav>
