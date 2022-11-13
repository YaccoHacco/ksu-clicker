<script>
    import { slide, fly } from "svelte/transition";
    import Icon from "./Icon.svelte";
    import Nav from "./Nav.svelte";

    export let views;
    export let view = "upgrade";

    let viewOpen = true

</script>

{#if viewOpen}
    <div class="flex flex-row w-200 h-full" transition:fly={{x: 800,duration:1000}}>
        <div class="absolute -left-5 flex flex-col justify-center bg-true-gray-700 bg-opacity-0 hover:bg-opacity-30 w-5 h-full transition-all" on:click={() => viewOpen = !viewOpen}>
            <Icon icon="arrow-right"/>
        </div>
        
        <div class="relative w-full h-full bg-purple-500">
            <div class="p-2 h-full">
                {#if views[view]}
                    {#key view}
                        <div class="w-full h-[calc(100%-48px)] overflow-hidden" out:slide={{duration: 1000}}>
                            <svelte:component this={views[view][1]}/>
                        </div>
                    {/key}
                {/if}
            </div>

            <div class="absolute bottom-0 w-full h-12">
                <Nav {views} {view} />
            </div>
        </div>
    </div>
{:else}
    <div class="absolute -left-5 flex flex-col justify-center bg-true-gray-700 bg-opacity-0 hover:bg-opacity-30 w-5 h-full transition-all" on:click={() => viewOpen = !viewOpen}>
        <Icon icon="arrow-left"/>
    </div>
{/if}