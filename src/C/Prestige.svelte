<script>
    import { get } from "svelte/store";
    import { emptyUpgrades } from "./db";
    import { stringNum, getPrestigePoints } from "./funcs";
    import { prestiges } from "./global";
    import Icon from "./Icon.svelte";
    import PrestigeUpgrade from "./PrestigeUpgrade.svelte";
    import { _user } from "./stores";


    let user = get(_user)
    _user.subscribe((u) => {
        user = u
    })

    $: points = getPrestigePoints(user)

    const preformPrestiege = () => {
        if (points >= 1) {
            user.prestige += points
            user.upgrades = JSON.parse(JSON.stringify(emptyUpgrades))
            user.money = 0
            _user.set(user)
        }
    }

</script>

<style>
    .prestige {
        @apply rounded-full bg-yellow-300 shadow-dark-800 shadow-lg cursor-pointer;
    }

    .prestige.disabled {
        @apply cursor-not-allowed !bg-true-gray-700;
    }
</style>

<div class="flex flex-col flex-grow h-full">
    <div class="text-2xl">
        Prestige
    </div>

    <div class="flex flex-col flex-grow justify-center items-center w-full">
        <div class="prestige" class:disabled={points < 1} on:click={preformPrestiege}>
            <Icon icon="prestige" size="200"/>
        </div>
        <div class="text-xl text-yellow-300 mt-2">Prestige +{stringNum(points)}</div>
        <div class="w-4/5 text-center">
            Each prestige point gives you a 5% boost to your output/second and can be spent on the upgrades below. You need to gain at least 1 prestige point to be able to prestige.
        </div>
        {#if user?.prestige > 0}
            <div class="text-yellow-300">
                {stringNum(user?.prestige * 5)}% Boost
            </div>
        {/if}
    </div>

    <div class="grid grid-cols-5 gap-1 w-full">
        {#each Object.keys(prestiges) as p}
            <PrestigeUpgrade name={p} upgrade={prestiges[p]}/>
        {/each}
    </div>
</div>