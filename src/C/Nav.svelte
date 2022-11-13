<script>
    import Icon from "./Icon.svelte";
    import { setView } from './funcs';

    export let views = {}
    export let view = "upgrades"

    $: viewsKeys = Object.keys(views)

</script>

<!-- Use css to do stuff -->
<style>
    .nav-tab {
        @apply flex flex-grow flex-row items-center p-2 transition-all duration-500 h-12;
    }

    .nav-tab.selected {
        @apply bg-transparent rounded-t-xl duration-0;
    }

    .nav-tab:not(.selected) {
        @apply bg-purple-700;
    }

    .nav-tab.selected+.nav-tab {
        @apply rounded-tl-xl;
    }
    
    .nav-tab.previous {
        @apply rounded-tr-xl;
    }
</style>


<div class="flex flex-row justify-center justify-between w-full nav-root bg-purple-500 z-50">
    {#each viewsKeys as page, i}
        <div class="nav-tab" class:previous={i < viewsKeys.length-1 && viewsKeys[i+1] == view} class:selected={view == page} on:click={() => setView(page)}>
            <Icon icon={page} size="30px" inline/>
            <div>{views[page][0]}</div>
        </div>
    {/each}
</div>