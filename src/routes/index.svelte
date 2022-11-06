<script>
	import { goto } from '@sapper/app';
	import { onMount } from 'svelte';
	import { createPopup } from '../components/PopupManager.svelte';
	// If you are using CommonJS modules:
	import Dropzone from 'Dropzone';

	let uploadOption = {
		uploadMultiple:false,
		maxFiles: 1
	}

	//TODO: File types .lpo!!!!
	onMount(() => {
		let upload = new Dropzone("div#upload-lupo", { url: "/"}, uploadOption);
		upload.on("addedfile", async (upfile) => {
  			var popup = createPopup("Bitte warten...", "Deine Datei wird hochgeladen...");
			let formData = new FormData();
			formData.append("file", upfile);
			formData.append("name", "Max_Mustermann");
			try {
				await fetch("http://" + window.location.hostname + ":3000/convert/json", {
					method: "POST",
					body: formData
				}).then((response) => {
					if(response.status == 200){
						popup.close();
						popup = createPopup("Erfolg!", "Deine Datei wurde erfolgreich hochgeladen!");
					}else{
						popup.close();
						createPopup("Fehler!", "Deine Datei konnte nicht hochgeladen werden!");
					}
			})
			} catch (error) {
				popup.close();
				createPopup("Fehler!", "Deine Datei konnte nicht hochgeladen werden! <br>" + error);
			}
			upload.removeAllFiles(true);
			goto("/select")
			popup.close();
		});
	})
	
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
	
	<div id="upload-lupo" style="display:flex; align-items:center; justify-content:center;">
	<img src="icons/upload.svg" alt="upload">
	</div>
	<p>LuPo Datei hochladen</p>
	<p class="bottom">BetterLuPo sendet deine Datei zur umwandlung an unsere Server. <br>
		Wir löschen die Datei sobald du fertig bist und speichern keine Daten.</p>
</main>