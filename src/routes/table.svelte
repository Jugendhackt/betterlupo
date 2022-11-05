<script>
    import { onMount } from 'svelte';
    import StatBox from '../components/StatBox.svelte';
    import TableSelection from '../components/TableSelection.svelte';
    let Leistungskurse;
    let grundkurse_schriftlich;
    let grundkurse_mündlich;
    let global_options = {};

    let total_selected;

    onMount(async () => {
        setTimeout(() => {
            Leistungskurse.addOption("Deutsch", false, true);
            Leistungskurse.selectOption("Deutsch");
            Leistungskurse.addOption("Englisch", true, true);
            Leistungskurse.addOption("Mathe");
            Leistungskurse.addOption("Spanisch", true, true, true);
        }, 100);
    });

    function refresh(event){
        console.log("refresh");
        global_options[event.detail.origin] = event.detail.options;
        console.log(global_options);
        total_selected = Leistungskurse.getSelected().length + grundkurse_schriftlich.getSelected().length + grundkurse_mündlich.getSelected().length;
    }

    /**
     * object.addOption(name) - Fach hinzufügen
     * object.removeOption(name) - Fach entfernen
     * object.selectOption(name) - Fach auswählen
     * object.unselectedOptions(name) - Fach abwählen
     * object.getSelected() - Array mit ausgewählten Fächern
     * object.getUnselected() - Array mit nicht ausgewählten Fächern
     */
    


</script>



<TableSelection on:refresh={refresh} bind:this={Leistungskurse} title="Leistungskurse"/>

<TableSelection on:refresh={refresh} bind:this={grundkurse_schriftlich}  title="Schriftliche Kurse"/>

<TableSelection on:refresh={refresh} bind:this={grundkurse_mündlich}  title="Mündliche Kurse"/>

<p></p>

<div style="display: flex; flex-direction: row; justify-content: space-around; column-gap:12px;">
<StatBox description="Stunden / Woche" value="0 / 40" icon="icons/time.svg" />
<StatBox description="Fächern" value={total_selected + " / 10"} icon="icons/school.svg" />
<StatBox description="Datei herunterladen" value="Fertig" icon="icons/done.svg" style="secondary" onclick={() => {console.log("AAA")}} hoverable={true}/>
</div>
<style>

</style>