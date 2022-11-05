<script>
    import TableElement from '../components/TableElement.svelte';
    import { createPopup } from '../components/PopupManager.svelte';

    export let title = "Fächerauswahl";
    let options = [];
    let loaded = false;

    export function getSelected(){
        return options.filter(option => option.selected);
    }

    export function getUnselected(){
        return options.filter(option => !option.selected);
    }

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

    export function unselectedOptions(name){
        let option = options.filter(option => option.name == name)[0];
        options = options.map(option => {
            if(option.name == name){
                option.selected = false;
            }
            return option;
        });
    }

    function handleRemoval(event){
        unselectedOptions(event.detail.name);
    }

    function openselection(){
        let unselected = options.filter(option => !option.selected);

        let content = document.createElement("div");

        for(let i = 0; i < unselected.length; i++){
            var css = 'button {';
            let option = unselected[i];
            let btn = document.createElement("button");
            btn.classList.add("selectionButton");
            btn.innerText = option.name;
            btn.id="btn"+option.name;
            content.appendChild(btn);
        }

        if(unselected.length === 0){
            content.innerHTML = "<p>Es sind keine Fächer mehr verfügbar.</p>";
        }
        if(options.length === 0){
            content.innerHTML = "<p>Es sind keine Fächer verfügbar.</p>";
        }

        console.log(content.innerHTML);

        content.style.display = "flex";
        content.style.flexDirection = "column";

        let popup = createPopup(title + " hinzufügen", `
            <div class="input">
                ${content.innerHTML}
           </div>
        `);

        for(let i = 0; i < unselected.length; i++){
            let option = unselected[i];
            let btn = document.getElementById("btn"+option.name);
            btn.addEventListener("click", () => {
                selectOption(option.name);
                popup.$destroy();
            });
        }
    }

</script>

<tableselection>
    <div class="titlecontainer">
        <h1>{title}</h1>
        <a on:click={openselection}><img src="icons/add.svg"></a>
    </div>
    {#if loaded}
    {#each options as option}
        {#if option.selected}
            <TableElement on:remove={handleRemoval} data={option}/>
        {/if}
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