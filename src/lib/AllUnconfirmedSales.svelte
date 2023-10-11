<script lang="ts">
    import UnconfirmedWidget from "./UnconfirmedWidget.svelte"
    import {unconfirmed_sales} from "$lib/store/store.js"
</script>
{#each $unconfirmed_sales as sale}
        <UnconfirmedWidget {sale}></UnconfirmedWidget>
{/each}