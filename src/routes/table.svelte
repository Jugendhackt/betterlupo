<script>
    import { onMount } from 'svelte';
    import TableSelection from '../components/TableSelection.svelte';
    let lks;

    

</script>



<TableSelection bind:this={lks} title="Leistungskurse"/>


<button on:click={() => {
    if(lks.addOption("test")){
        console.log("added");
    }
}}>Add</button>
<TableSelection title="Schriftliche Kurse"/>

<TableSelection title="Mündliche Kurse"/>

<p></p>



<style>

</style>