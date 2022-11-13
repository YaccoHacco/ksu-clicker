<script>
    import Btn from "./Btn.svelte";
    import { accountSignOut } from "./account";
    import { get } from "svelte/store";
    import { _auth, _user } from "./stores";
    import { sendUpdate } from "./db";

    let auth = get(_auth)
    _auth.subscribe((a) => {
        auth = a
    })

    let user = get(_user)
    _user.subscribe((u) => {
        user = u
    })

</script>

<div class="flex flex-col">
    <div class="text-2xl">
        Account
    </div>

    <div class="flex flex-col gap-2">

        <Btn click={() => accountSignOut(auth)}>Logout</Btn>

        <Btn click={async () => await sendUpdate(user)}>Save</Btn>

    </div>
</div>
