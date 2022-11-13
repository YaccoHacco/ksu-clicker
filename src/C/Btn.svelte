<script>

    export let click = () => {}
    export let disabled = false

    const _click = (e) => {
        if (!disabled) click(e)
    }

</script>

<style>
    .btn {
        @apply bg-green-400 p-1 rounded cursor-pointer shadow-dark-800 shadow-sm select-none;
    }

    .btn:hover {
        @apply bg-green-500;
    }

    .btn.disabled {
        @apply bg-true-gray-600;
    }

    .btn.disabled:hover {
        @apply cursor-not-allowed;
    }
</style>

<div class="btn" class:disabled={disabled} on:click={_click}>
    <slot></slot>
</div>