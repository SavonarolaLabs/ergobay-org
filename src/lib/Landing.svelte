<script lang="ts">
	import SellWidget from "./SellWidget.svelte";
	import AllOffers from "./AllOffers.svelte";
	import AllUnconfirmedSales from "./AllUnconfirmedSales.svelte";
	import { unconfirmed_sales } from "./store/store.js";

</script>

<div class="bg-main grow flex flex-col items-center gap-5" style="padding-top:80px;">
    <SellWidget></SellWidget>
    <AllUnconfirmedSales></AllUnconfirmedSales>
    <AllOffers></AllOffers>
</div>

<style>
    .bg-main{
        min-height: 100vh;
    }
</style>