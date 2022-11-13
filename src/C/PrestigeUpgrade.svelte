<script>
    import { get } from "svelte/store";
    import Icon from "./Icon.svelte";
    import { _user } from "./stores";


    export let upgrade;
    export let name;

    let user = get(_user)
    _user.subscribe((u) => {
        user = u
    })

    const buyPrestige = () => {
        if (user?.prestige >= upgrade.price) {
            user.prestige -= upgrade.price
            user.prestiges[name] = true
            _user.set(user)
        }
    }

</script>

<style>
    .expensive {
        @apply bg-true-gray-600 cursor-not-allowed;
    }

    .affordable {
        @apply bg-green-500 cursor-pointer;
    }
    .bought {
        @apply !bg-yellow-300;
    }
</style>

<div class="flex flex-col justify-between rounded p-1 shadow-dark-800 shadow-sm select-none" class:expensive={user?.prestige < upgrade.price} class:affordable={user?.prestige >= upgrade.price} class:bought={user?.prestiges?.[name]} on:click={buyPrestige}>
    <div class="text-xl">{name}</div>
    <div class="text-sm">{upgrade.desc}</div>
    <div class="flex flex-row items-center text-yellow-300"><Icon icon="prestige"/>{upgrade.price}</div>
</div>