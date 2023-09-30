<script lang="ts">
    import { fade } from 'svelte/transition';
    export let base: string;
    export let pages: number;
    let i = 1;
    $: src = `/${base}-${i.toString().padStart(2, '0')}.svg`;
</script>

<img in:fade {src} alt={base} on:click={() => (i = (i % pages) + 1)} class="tikz"/>
