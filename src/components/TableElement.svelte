<script>
    import { createEventDispatcher } from 'svelte';
    export let editable = true;
    export let data = {};

    const dispatch = createEventDispatcher();

    function removeSelf(){
        dispatch('remove', {
            name: data.name
        });
    }

</script>

<div class="container">
    <h2>{data.name}</h2>
    {#if editable}
        <a on:click={removeSelf}><img src="icons/remove.svg"></a>
    {/if}
</div>

<style>
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