<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import Nav from '../components/Nav.svelte';
	import Popup from '../components/Popup.svelte';

	import PopupManager, {popups, createPopup } from '../components/PopupManager.svelte';

	let popupsl = false;

	function handlePopupClose(event){
		var id = event.detail.id;
		$popups = $popups.filter(popup => popup.attributes.id !== id);
	}

	// createPopup("Init", "<p style='color:red;''>This is a test popup</p>");
	// // $popups = $popups.filter(popup => popup.attributes.title !== "Init");
	// createPopup("Testing", "This is another test popup");
	// createPopup("Testing", "This is another test popup");
	// createPopup("Testing", "This is another test popup");
	// createPopup("Testing", "This is another test popup");
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
<PopupManager on:loadPopups={handlePopupLoad} />
<div id="global">
	{#if popupsl}
		{#each $popups as popup}
			<Popup on:close={handlePopupClose} attributes={popup.attributes}/>
		{/each}
	{/if}
		

	<body>
		<Nav/>

		<main>
			
			<slot></slot>
		</main>
	</body>
</div>