<script>
    import { _user } from "./stores";
    import { getMoneyPerClick } from "./funcs"
    import { get } from "svelte/store";

    export let addParticle

    let user = get(_user)
    _user.subscribe((u) => {
        user = u
    })

    const clickCat = () => {
        user.clicks += 1
        user.money += getMoneyPerClick(user)
        _user.set(user)
        addParticle()
    }

</script>

<style>
    .clicker {
        @apply w-50 h-50 shadow-dark-800 shadow-lg rounded-full;
    }

    .clicker:hover {
        @apply w-55 h-55;

    }
</style>

<div class="clicker transition-all cursor-pointer" on:click={clickCat}>
    <div class="w-full h-full flex justify-center items-center rounded-full bg-dark-50 bg-opacity-20">
        <img class="w-8/10" src="/power_cat.png">
    </div>
</div>