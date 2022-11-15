<script>
    export let description = "Beschreibung";
    export let value = "Wert";
    export let icon = "icon";
    export let style = "primary"
    export let onclick = () => {};
    export let hoverable = false;
    console.log(hoverable);


</script>

<div on:click={onclick} on:keydown={onclick} class="statbox {style} {hoverable}">
    <div class="statbox__icon">
        <i class="material-icons"><img alt="icon" src={icon}></i>
    </div>
    <div class="statbox__content">
        <div class="statbox__value">{value}</div>
        <div class="statbox__description">{description}</div>
    </div>
</div>

<style>
    .statbox.primary {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 10px 30px;
        border-radius: 5px;
        background-color: var(--color-background);
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
        transition: all 0.2s ease-in-out;
    }

    .statbox.secondary {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 10px 30px;
        border-radius: 5px;
        background-color: #2B2D42;
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
        transition: all 0.2s ease-in-out;
    }

    .statbox.secondary.true:hover {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 10px 30px;
        border-radius: 5px;
        background-color: #3f4260;
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
        transition: all 0.2s ease-in-out;
        cursor: pointer;
    }

    .statbox__icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--color-primary);
        color: var(--color-text);
    }

    .statbox__content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        margin-left: 10px;
    }

    .statbox__value {
        font-size: 1.5rem;
        font-weight: 500;
        color: var(--color-text);
        margin-bottom:0;
    }

    .statbox__description {
        font-size: 0.8rem;
        font-weight: 400;
        margin-top:0;
        color: var(--color-text);
    }
</style>