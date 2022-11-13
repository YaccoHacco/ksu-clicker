<script>
    import Icon from '@iconify/svelte';
    import { icons } from './global';

    export let icon = 'question'
    export let inline = false
    export let size = 20
    export let rot = 0

    $: icon = icons[icon] ?? icon
</script>

<style>
    .iconify.inline :global(svg) {
       vertical-align: -0.125em;
   }
</style>

<div class="iconify transition-all" class:inline={inline} style={`transform: rotate(${rot}deg)`} on:click>
    <Icon {icon} height={size}/>
</div>