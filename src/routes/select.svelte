<script>
    import {goto} from '@sapper/app';

</script>

<style>
    .select {
        transition: .4s ease-in;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: center;
        width: 100%;
        height: 100%;
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
    }



    .select:hover {
        cursor: pointer;
    }

    .select:hover img {
        padding-left: 100px;
        transition: all .4s ease-in-out;
    }

    .select img{
        transition: all .4s ease-in-out;
        align-self: center;
    }




    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }


</style>
<!-- Path: select.svelte -->
 <!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="container" >
    <div class="select" on:click={goto("/questions")}>
        <h1>Fragenbogen ausfüllen</h1>
        <img class="arrow" src="icons/arrow_forward.svg" alt="arrow right" draggable="false">
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="select" on:click={goto("/table")}>
        <h1>Manuell bearbeiten</h1>
        <img class="arrow" src="icons/arrow_forward.svg" alt="arrow right" draggable="false">
    </div>
</div>

