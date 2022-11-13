<script>
    import Particle from "./Particle.svelte";
    import Clicker from "./Clicker.svelte";
    import Icon from "./Icon.svelte";

    import { _user } from './stores'
    import { stringNum, getMoneyPerClick, getMoneyPerSecond, getPrestigePoints } from './funcs'
    import { get } from "svelte/store";
    import { onMount } from "svelte";
    import { sendUpdate } from "./db"

    let particles = []
    let totalWidth

    let user = get(_user)
    _user.subscribe((u) => {
        user = u
    })

    const addParticle = () => {
        particles = [...particles, {
            x: Math.random()*totalWidth,
            y: 0,
        }]
    }

    const updateMoney = () => {
        user.money += getMoneyPerSecond(user)
        _user.set(user)
    }

    const doUpdate = async () => {
        await sendUpdate(user)
    }

    onMount(() => {
        setInterval(updateMoney, 1000)
        setInterval(doUpdate, 1000 * 60)
    })

</script>


<div class="relative overflow-hidden flex flex-col flex-grow w-full h-full justify-center items-center transition-all" bind:clientWidth={totalWidth}>
    <div class="z-0">
        <Particle {particles} />
    </div>
    
    <div class="flex flex-row items-center justify-around text-lg gap-2 absolute top-2 left-2 right-2 px-2 bg-true-gray-500 bg-opacity-40 rounded-lg font-mono shadow-dark-800 shadow-sm">
        <div class="flex flex-row items-center text-green-500">
            <Icon icon="money" /> {stringNum(getMoneyPerClick(user))}/click
        </div>
        <div class="flex flex-row items-center text-green-500">
            <Icon icon="money" /> {stringNum(getMoneyPerSecond(user))}/s
        </div>
        <div class="flex flex-row items-center text-green-500">
            <Icon icon="money" /> {stringNum(user ? user.money : 0)}
        </div>
        <div class="flex flex-row items-center text-yellow-300">
            <Icon icon="prestige" /> {stringNum(user.prestige)} (+{stringNum(getPrestigePoints(user))})
        </div>
    </div>

    <Clicker {addParticle} />
</div>