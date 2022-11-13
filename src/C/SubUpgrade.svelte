<script>
    import Icon from "./Icon.svelte";
    import { get } from "svelte/store";
    import Btn from "./Btn.svelte";
    import { stringNum } from "./funcs";
    import { _user } from "./stores";

    let user = get(_user)
    _user.subscribe((u) => {
        user = u
    })
    
    export let parent
    export let name
    export let sub

    $: bought = user?.upgrades?.[parent]?.[name]
    $: price = sub.price(bought)

    const buy = () => {
        user.upgrades[parent][name] += 1
        user.money -= price
        _user.set(user)
    }
</script>

<style>
    .buy-count {
        @apply w-4 h-4 border-black border-2;
    }

    .bought {
        @apply bg-black;
    }
</style>

<div class="grid grid-cols-[200px_1fr_120px_100px] items-center">
    <div>{name}</div>
    <div>{sub?.desc}</div>
    <div class="flex flex-row items-center gap-1 mr-4">
        {#each Array(5) as a,i}
            <div class="buy-count" class:bought={i<bought}></div>
        {/each}
    </div>
    <Btn disabled={price > user.money || bought > 4} click={buy}>
        {#if bought > 4}
            Max
        {:else}
            <div class="flex flex-row items-center gap-1">
                <Icon icon="money"/>
                {stringNum(price)}
            </div>
        {/if}
    </Btn>
</div>