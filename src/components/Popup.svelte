<script>
import { scale, fade } from 'svelte/transition';
import { closePopup } from '../components/PopupManager.svelte';

export let attributes = {};

let animated = false;

export function close(){
    closePopup(attributes.id);
    animated = false;
}

animated = true;

</script>

{#if animated}
<div  id={"popup"+attributes.id}>
    <div transition:fade="{{}}" on:click={close} class="dimm"></div>
    <div in:scale class="container">
        <p on:click={close} on:keydown={close} class="close"><img src="icons/close_gray.svg" alt="X"></p>
        <h1 class="title">{attributes.title}</h1>
        <div class="content">
            {@html attributes.content}
        </div>
    </div>
</div>
{/if}


<style>

    .title{
        padding-top:0;
        margin-top:0;
    }

    .dimm{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        z-index: 100;
    }

    #popup{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 100;
    }

    .container{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 2em 2em;
        min-width: 40%;
        background-color: #ffffff;
        z-index: 101;
        color: #000000;
        border-radius: 10px;
    }

    .close{
        position: absolute;
        top: 0px;
        right: 0px;
        padding: 0.5em;
        cursor: pointer;
    }

    .close img{
        width: 20px;
        margin:0;
    }

</style>