<script>
    import {offers} from "$lib/store/store";
	import BuyWidget from "./BuyWidget.svelte";
</script>


{#each $offers as offer}
<BuyWidget {offer}></BuyWidget>
{/each}