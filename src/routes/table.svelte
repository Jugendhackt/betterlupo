<script>
    import { onMount } from 'svelte';
    import { goto } from '@sapper/app'
    import { createPopup } from '../components/PopupManager.svelte';
    import StatBox from '../components/StatBox.svelte';
    import TableSelection from '../components/TableSelection.svelte';
    let Leistungskurse;
    let grundkurse_schriftlich;
    let grundkurse_mündlich;
    let global_options = {};
    let global_hours = 0;

    let total_selected;

    let lupo = {};

    onMount(async () => {
        setTimeout(() => {
            lupo = JSON.parse(localStorage.getItem("lupo"))
            if(!lupo){
                goto('/');
            }
            Leistungskurse.addOption("Deutsch", 5, false, true);
            Leistungskurse.selectOption("Deutsch");
            Leistungskurse.addOption("Englisch", 5, true, true);
            Leistungskurse.addOption("Mathe", 5);
            Leistungskurse.addOption("Spanisch", 5, true, true, true);
        }, 100);
    });

    function refresh(event){
        console.log("refresh");
        global_options[event.detail.origin] = event.detail.options;
        console.log(global_options);
        total_selected = Leistungskurse.getSelected().length + grundkurse_schriftlich.getSelected().length + grundkurse_mündlich.getSelected().length;
        global_hours = Leistungskurse.getSelectedHours() + grundkurse_schriftlich.getSelectedHours() + grundkurse_mündlich.getSelectedHours();
    }

    /**
     * object.addOption(name, hours, canedit = true, abi = false, language = false) - Fach hinzufügen
     * object.removeOption(name) - Fach entfernen
     * object.selectOption(name) - Fach auswählen
     * object.unselectedOptions(name) - Fach abwählen
     * object.getSelected() - Array mit ausgewählten Fächern
     * object.getUnselected() - Array mit nicht ausgewählten Fächern
     */
    


</script>

<div style="display: flex; flex-direction: row; justify-content: space-around; column-gap:12px;">
    <StatBox description="Stunden / Woche" value={global_hours + " / 40"} icon="icons/time.svg" />
    <StatBox description="Fächern" value={total_selected + " / 10"} icon="icons/school.svg" />
    <StatBox description="Datei herunterladen" value="Fertig" icon="icons/done.svg" style="secondary" onclick={() => {console.log("AAA")}} hoverable={true}/>
    </div>

<TableSelection on:refresh={refresh} bind:this={Leistungskurse} title="Leistungskurse"/>

<TableSelection on:refresh={refresh} bind:this={grundkurse_schriftlich}  title="Schriftliche Kurse"/>

<TableSelection on:refresh={refresh} bind:this={grundkurse_mündlich}  title="Mündliche Kurse"/>

<p></p>


<style>

</style>