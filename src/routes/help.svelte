<script>
    import { createPopup } from '../components/PopupManager.svelte';
    import { onMount } from 'svelte';
</script>


<style>
    .helptext {
        width: 50%;
    }
</style>

<h1>Hilfe und Informationen zu BetterLuPo</h1>
<h1>FAQ</h1>


<div class="whatisbl helptext">
    <h2>Was ist BetterLuPo?</h2>

    <p>BetterLuPo ist eine WebAnwendung zur Bearbeitung von LuPo Dateien für Schüler. Lehrer in NRW verteilen für jeden Schüler LuPo dateien welche normalerweise in dem LuPo Schülerprogramm geöffnet werden. Um die veraltete und wenig Intuitive Oberfläche zu umgehen haben wir BetterLupo gebaut welche euch erlaubt eure Dateien übersichtlich Intuitiv zu bearbeiten.</p>
</div>

<div class="howisblworking helptext">
    <h2>Wie funktioniert BetterLuPo?</h2>

    <p>Du kannst einfach deine Datei hochladen und sie bearbeiten. BetterLuPo sendet deine Datei nach den hochladen zur umwandlung an unsere Server. Dies ist nötig da wir das LuPo Datei Format schlecht auslesen können. Wir löschen die Datei sobald die Umwandlung fertig ist! Beim herunterladen deiner LuPo Datei werden deine Browser Daten erneut an unsere Server gesendet um die Daten wieder zurück in eine LuPo Datei zu verwandeln. Wir speichern keine Daten!</p>
</div>

<div class="whoisdevbl helptext">
    <h2>Wer entwickelt/kümmert sich um BetterLuPo?</h2>

    <p>BetterLuPo's ursprüngliche Version ist bei JugendHackt 2022 in Köln entstanden und wird nun von Collection Software weiter entwickelt. Wir sind auf deine Hilfe angewiesen! Wenn du Verbessrungsvorschläge hast sende uns doch eine E-Mail an <span style="color: #2B2D42; font-weight: bold;">betterlupo@collection-software.com</span>. Collection-Software ist ein "Unternehmen" gegründet von Mitgliedern der ursprünglichen Gruppenmitgliedern bei JugendHackt.</p>
</div>

<div class="supportbl helptext">
    <h2>Wie kann ich BetterLuPo unterstützen?</h2>

    <p>Wir stellen dir unser Tool kostenlos zur Verfügung. Um unsere Ausgaben zu decken sind wir auf Spenden angewiesen. Falls du uns unterstützen möchtest bitten wir dich dies über unsere <a href="https://collection-software.com">offizielle Seite</a> zu tun. </p>
</div>