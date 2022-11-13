<script>
    import { fly } from "svelte/transition";
    import Btn from "./Btn.svelte";
    import Icon from "./Icon.svelte";
    import { stringNum, getOutputPer } from "./funcs";
    import SubUpgrade from "./SubUpgrade.svelte";
    import { _user } from "./stores";
    import { get } from "svelte/store";

    export let name;
    export let upgrade;
    export let buyAmount;

    let dropdownOpen = false
    let dropHeight = 0

    let user = get(_user)
    _user.subscribe((u) => {
        user = u
    })

    const getCost = (user) => {
        let r = 0
        if (buyAmount > 0) {
            for(var i=0;i<buyAmount;i++) r+= upgrade.price(user?.upgrades?.[name]?.count + i)
        }
        return r * (user?.prestiges["Cat Cash"] ? 0.5 : 1) * (user?.prestiges["Coach Tang"] ? 0.25 : 1)
    }
    $: cost = getCost(user, buyAmount)


    const buyUpgrade = () => {
        user.money -= cost
        user.upgrades[name].count += buyAmount
        _user.set(user)
    }

</script>

<div class="w-full rounded overflow-hidden shadow-dark-800 shadow-sm">
    <div class="grid grid-cols-[250px_40px_1fr_40px] items-center gap-3 p-1 bg-purple-600">
        <div class="text-xl">{name}</div>
        <div>{user?.upgrades?.[name]?.count ?? 0}</div>
        <Btn click={buyUpgrade} disabled={cost - user.money > 0.001}>
            <div class="flex flex-row justify-between gap-1">
                <div class="flex flex-row gap-1">
                    <Icon icon="money"/> {stringNum(cost)}
                </div>
                <div>
                    +{stringNum(getOutputPer(user, name)*buyAmount)}{name == "College Student" ? "/click" : "/s"}
                </div>
                <div>
                    +{buyAmount} Upgrade
                </div>
            </div>
        </Btn>
        <div class="flex flex-col justify-center items-center h-full">
            {#if upgrade?.sub}
                <Icon icon="dropdown" size={25} rot={dropdownOpen ? 0 : 90} on:click={() => {dropdownOpen = !dropdownOpen}}/>
            {/if}
        </div>
    </div>

    {#if upgrade?.sub}
        <div class='overflow-hidden h-min'>
            {#if dropdownOpen}
                <div class="bg-purple-600 rounded-b px-2" bind:clientHeight={dropHeight} transition:fly={{y: -dropHeight-10, duration: 500, opacity:100}}>
                    <div class="flex flex-col gap-3 border-t-2 border-black py-1">
                        {#each Object.keys(upgrade.sub) as sub}
                            <SubUpgrade name={sub} sub={upgrade.sub[sub]} parent={name} />
                        {/each}
                    </div>
                </div>
            {/if}
        </div>
    {/if}
</div>