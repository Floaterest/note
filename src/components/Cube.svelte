<script lang="ts">
    function cube(n: number): boolean {
        let [c, b, i] = [0, 0, 0];
        while (c < n) {
            b += 6 * i;
            c += b + 1;
            i++;
        }
        return n == c;
    }
    let value: number = 0;
    $: valid = Number.isInteger(value);
</script>

<div>
    <input type="number" bind:value /> is
    {#if !valid || !cube(value)}
        not
    {/if}
    {#if valid}
        a cube
    {:else}
        an integer
    {/if}
</div>

<style lang="sass">
    @use '../styles/html'
    @use '../styles/colors'

    input[type=number]
        background: unset
        border: 1px solid colors.$color
        font: html.$mono
        font-size: unset
        color: colors.$color
        -moz-appearance: textfield
        &::-webkit-outer-spin-button, &::-webkit-inner-spin-button 
            -webkit-appearance: none

</style>
