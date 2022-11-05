<script>
	import successkid from 'images/successkid.jpg';
	import { onMount } from 'svelte';
	import { createPopup } from '../components/PopupManager.svelte';
</script>

<style>

	img {
		width: 50%;
		margin: auto;
		margin-bottom: 1em;
	}

	.bottom {
		position: absolute;
		text-align: center;
		bottom: 2%;
		left: 50%;
		transform: translate(-50%, 0);
		font-size: 12px;
	}

	p{
		margin:0;
	}

</style>

<svelte:head>
	<title>BetterLuPo</title>
</svelte:head>

<main>
	<div style="display:flex; align-items:center; justify-content:center;">
	<img src="icons/upload.svg" alt="upload">
	</div>
	<p>LuPo Datei hochladen</p>
	<p class="bottom">BetterLuPo sendet deine Datei zur umwandlung an unsere Server. <br>
		Wir löschen die Datei sobald du fertig bist und speichern keine Daten.</p>
</main>