<script>
    import TableElement from '../components/TableElement.svelte';

    export let title = "Fächerauswahl";
    let options = [];
    let loaded = false;

    export const addOption = (name) => {
        if(options.filter(option => option.name === name).length > 0){
            return false;
        }
        let data = {
            name: name,
            selected: false
        }
        options = [...options, data];
        loaded = false;
        loaded = true;
        return true;

    }

    export function removeOption(name){
        options = options.filter(option => option.name !== name);
    }

    export function selectOption(name){
        options = options.map(option => {
            if(option.name == name){
                option.selected = !option.selected;
            }
            return option;
        });
    }

    for(let i = 0; i < 3; i++){
        addOption("umom" + i);
    }

    function handleRemoval(event){
        removeOption(event.detail.name);
    }

</script>

<tableselection>
    <div class="titlecontainer">
        <h1>{title}</h1>
        <a><img src="icons/add.svg"></a>
    </div>
    {#if loaded}
    {#each options as option}
        <TableElement on:remove={handleRemoval} data={option}/>
    {/each}
    {/if}
</tableselection>

<style>

    .titlecontainer{
        margin-top: 2em;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-left: #2B2D42 15px solid;
        padding: .5em 1em;
        background-color: #2B2D42;
        width: 700px;
        border-radius: 10px;
    }

    img{
        width: 1.8em;
        height: 1.8em;
    }

    a{
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    h1{
        font-size: 2em;
        font-weight: 600;
        color: #ffffff;
        margin: 0;
    }

</style>