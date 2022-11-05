<script context="module">
    import Popup from './Popup.svelte';
    let idIncrement = 0;

    export function createPopup(title, content) {       

        let popup = new Popup({
            target: document.body,
            props: {
                attributes: {
                    id: idIncrement++,
                    title: title,
                    content: content
                }
            }
        })
        return popup;
    }

    export function closePopup(id) {
        document.getElementById("popup"+id).replaceChildren();
    }
</script>