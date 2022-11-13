<script>
    import Icon from "./Icon.svelte";

    export let particles
</script>

<style>
    @keyframes particle {
        0% {
            opacity: 0;
            rotate: 0deg;
        }
        10% {
            opacity: 0.7;
        }
        70% {
            opacity: 0.7;
        }
        100% {
            top: 120%;
            opacity: 0;
            rotate: 720deg;
        }
    }

    .par {
        opacity: 0;
        animation: particle 10s; 
    }


</style>

<div class="overflow-hidden">
    {#each particles as particle}
        <div class="absolute par z-0 pointer-events-none" style={`left: ${particle.x}px; top:${particle.y}px;`}>
            <Icon icon="money" size="30"/>
        </div>
    {/each}
</div>