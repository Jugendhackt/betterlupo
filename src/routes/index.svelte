<script>
	import { goto } from '@sapper/app';
	import { onMount } from 'svelte';
	import { createPopup } from '../components/PopupManager.svelte';
	// If you are using CommonJS modules:
	import Dropzone from 'dropzone';

	let uploadOption = {
		uploadMultiple:false,
		maxFiles: 1
	}

	//TODO: File types .lpo!!!!
	onMount(async () => {
		let upload = new Dropzone("div#upload-lupo", { url: "/"}, uploadOption);
		upload.on("addedfile", async (upfile) => {
			document.getElementById("upicon").innerHTML="<div class='spinner'></div>";
  			var popup = createPopup("Bitte warten...", "Deine Datei wird hochgeladen...");
			let formData = new FormData();
			formData.append("file", upfile);
			formData.append("name", "Max_Mustermann");
			let res;
			try {
				fetch("http://" + window.location.hostname + ":3000/convert/json", {
					method: "POST",
					body: formData
				}).then(async (response) => {
					try{
						document.getElementById("upicon").innerHTML="<img style='width:80px;' src='icons/upload.svg' alt='upload'> <p>LuPo Datei hochladen</p>";
						console.log("Response recieved")
						let dataobj = await response.json();
						console.log(dataobj);
						if(response.status == 200){
							localStorage.setItem("lupo", JSON.stringify(dataobj));
							goto("/select")
						}else{
							console.log("An Error occured!")
							createPopup("Fehler!", "Deine Datei konnte nicht hochgeladen werden!");
						}
					}catch(e){
						console.log(e);
						createPopup("Fehler!", "Deine Datei konnte nicht hochgeladen werden!");
					}
			})
			} catch (error) {
				createPopup("Fehler!", "Deine Datei konnte nicht hochgeladen werden! <br>" + error);
			}
			upload.removeAllFiles(true);
			popup.close();
		});
	})
	
</script>

<style>

	img {
		width: 80px;
		margin: auto;
		margin-bottom: 1em;
	}

	#upicon{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	#upicon img{
		width: 80px;
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
		<div id="upicon">
			<img src="icons/upload.svg" alt="upload">
			<p>LuPo Datei hochladen</p>
		</div>
	</div>
	<p class="bottom">BetterLuPo sendet deine Datei zur umwandlung an unsere Server. <br>
		Wir löschen die Datei sobald du fertig bist und speichern keine Daten.</p>
</main>