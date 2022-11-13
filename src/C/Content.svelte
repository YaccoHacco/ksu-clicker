<script>
    import { get } from 'svelte/store'
    import Main from './Main.svelte';
    import View from './View.svelte';
    import Loader from './Loader.svelte';

    import { _view, _user } from './stores'
    import init_account from './account';


    import Upgrades from "./Upgrades.svelte"
    import Prestige from "./Prestige.svelte"
    import Account from "./Account.svelte"
    import { onMount } from 'svelte';
    import Login from './Login.svelte'

    const views = {
        upgrades: ['Upgrades', Upgrades],
        prestige: ['Prestige', Prestige],
        // stats: ['Global Stats', Stats],
        // settings: ['Leaderboard', Leaderboard],
        account: ['Account', Account],
    }

    let view = get(_view)
    _view.subscribe((v) => {
        view = v
    })

    let user = get(_user)
    _user.subscribe((u) => {
        user = u
    })

    let loaded = false;
    let failed = false

    onMount(async () => {
        if(!init_account()) failed = true
        loaded = true;
    })

</script>

<style>
    .bg-grad {
        background: rgb(32,32,32);
        background: linear-gradient(0deg, rgba(32,32,32,1) 0%, rgba(82,24,136,1) 50%, rgba(82,24,136,1) 100%); 
    }
</style>

<div class="flex flex-row w-full h-full bg-grad">
    {#if failed}
        <div>FAILED</div>
    {:else if loaded}
        {#if user}
            <div class="flex-grow">
                <Main />
            </div>
            <div class="relative">
                <div class="overflow-hidden h-full">
                    <View {views} {view}/>
                </div>
            </div>
        {:else}
            <Login />
        {/if}
    {:else}
        <Loader></Loader>
    {/if}
</div>