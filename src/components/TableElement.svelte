<script>
    import { createEventDispatcher } from 'svelte';
    export let data = {editable: true, allowabi: false};
    let abi = "X";

    const dispatch = createEventDispatcher();
 
    function removeSelf(){
        abi = "X";
        dispatch('changeabi', {
            name: data.name,
            abilevel: abi
        });
        dispatch('remove', {
            name: data.name
        });
    }

    function changeabi(){
        if(abi == "X"){
            abi=0;
        }
        if(abi < 4){
            abi++;
        }else{
            abi = -1;
        }
        
        if(abi == -1){
            abi = "X"
        }
        
        dispatch('changeabi', {
            name: data.name,
            abilevel: abi
        });

        
    }
    

    function changelanguagestart(){
            dispatch('changelanguagestart', {
                name: data.name,
                selected: document.getElementById("langstart").value
            });
        }

    function changelanguagenum(){
            dispatch('changelanguagenum', {
                name: data.name,
                selected: document.getElementById("langnum").value
            });
        }

</script>

<div class="container">
    <h2>{data.name}</h2>
    <div style="display:flex; align-items:center;">
        {#if data.lang}
        <p style="margin-right:5px;">ist meine</p>
            <select id="langnum" on:change={changelanguagenum}>
                <option value="1">1. Fremdsprache</option>
                <option value="2">2. Fremdsprache</option>
                <option value="3">3. Fremdsprache</option>
            </select>
            <p style="margin-right:5px;">seid der </p>
            <select id="langstart" on:change={changelanguagestart}>
                <option value="5">5. Klasse</option>
                <option value="6">6. Klasse</option>
                <option value="7">7. Klasse</option>
                <option value="8">8. Klasse</option>
                <option value="9">9. Klasse</option>
                <option value="10">10. Klasse</option>
            </select>
        {/if}
        {#if data.allowabi}
            <p title="Abifach" on:click={changeabi} id="abifach">{abi}</p>
        {/if}
        {#if data.editable}
            <a title="Entfernen" on:click={removeSelf}><img src="icons/remove.svg"></a>
        {/if}
    </div>

</div>

<style>
    select{
        height: 30px;
        margin-right: 5px;
        border-radius: 10px;
        border: 1px solid #2B2D42;
    }


    #abifach{
        color: red;
        font-weight: bold;
        margin-right: 1em;
        -webkit-user-select: none; /* Safari */        
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* IE10+/Edge */
        user-select: none; /* Standard */
    }

    #abifach:hover{
        cursor: pointer;
    }

    .container{
        display: flex;
        border-left: gray 15px solid;
        justify-content: space-between;
        color:black;
        align-items: center;
        padding: .2em 1em;
        background-color: white;
        width: 700px;
        border-radius: 10px;
        margin-top: .3em;
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

    h2{
        margin:0;
    }
</style>