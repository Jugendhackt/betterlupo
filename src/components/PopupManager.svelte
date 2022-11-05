<script>
</script>

<script context="module">
    import { writable } from 'svelte/store';
    import { get } from "svelte/store";
    export let popups = writable([]);
    let idIncrement = 0;

    export function createPopup(title, content) {       
        get(popups).push({
            attributes:{
                id: idIncrement++,
                title: title,
                content: content
            }
        });
        
        console.log(get(popups));
    }
</script>