<script>
	import Nav from '../components/Nav.svelte';
</script>

<style>
	main {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		max-width: 100%;
		overflow: hidden;
		background-color: #EF233C;
		flex: 1;
	}


	body{
		margin: 0;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	
</style>
<div id="global">
	<body>
		<Nav/>

		<main>
			
			<slot></slot>
		</main>
	</body>
</div>