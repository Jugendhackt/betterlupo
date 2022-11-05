<script>
    import { onMount } from 'svelte';
    import TableSelection from '../components/TableSelection.svelte';
    let Leistungskurse;
    let grundkurse_schriftlich;
    let grundkurse_mündlich;

    onMount(async () => {
        setTimeout(() => {
            Leistungskurse.addOption("Deutsch");
            Leistungskurse.addOption("Englisch");
            Leistungskurse.addOption("Mathe");
        }, 100);
    });

    /**
     * object.addOption(name) - Fach hinzufügen
     * object.removeOption(name) - Fach entfernen
     * object.selectOption(name) - Fach auswählen
     * object.unselectedOptions(name) - Fach abwählen
     * object.getSelected() - Array mit ausgewählten Fächern
     * object.getUnselected() - Array mit nicht ausgewählten Fächern
     */
    


</script>



<TableSelection bind:this={Leistungskurse} title="Leistungskurse"/>

<TableSelection bind:this={grundkurse_schriftlich}  title="Schriftliche Kurse"/>

<TableSelection bind:this={grundkurse_mündlich}  title="Mündliche Kurse"/>

<p></p>



<style>

</style>