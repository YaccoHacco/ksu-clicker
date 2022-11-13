<script>
    import Btn from "./Btn.svelte";
    import Icon from "./Icon.svelte";
    import { _auth } from "./stores";

    import { accountGoogleSignIn } from './account'
    import { get } from "svelte/store";
</script>

<div class="flex flex-col flex-grow justify-center items-center">
    <div class="flex flex-col gap-1 bg-true-gray-500 p-2 rounded-lg shadow-dark-800 shadow-lg">
        <div class="text-2xl border-b-2 border-black pb-1">Login</div>
        <div>Login to access KSU Clicker</div>
        <div class="flex flex-row justify-center w-full">
            <Btn><Icon icon="google" on:click={async () => await accountGoogleSignIn(get(_auth))}/></Btn>
        </div>
    </div>
</div>