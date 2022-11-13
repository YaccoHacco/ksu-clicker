<script>
    import Upgrade from "./Upgrade.svelte";
    import Btn from "./Btn.svelte";
    import { upgrades } from './global';

    let buyAmount = 1
</script>

<div class="overflow-scroll max-h-full pb-2">
    <div class="flex flex-col gap-2">
        <div class="flex flex-row gap-2">
            <div class="text-2xl">Upgrades</div>

            <Btn disabled={buyAmount == 1} click={() => buyAmount = 1}>+1</Btn>
            <Btn disabled={buyAmount == 10} click={() => buyAmount = 10}>+10</Btn>
            <Btn disabled={buyAmount == 100} click={() => buyAmount = 100}>+100</Btn>
            <Btn disabled={buyAmount == 1000} click={() => buyAmount = 1000}>+1000</Btn>
        </div>

        {#each Object.keys(upgrades) as upgrade}
            <Upgrade upgrade={upgrades[upgrade]} name={upgrade} {buyAmount}/>
        {/each}
        
    </div>
</div>