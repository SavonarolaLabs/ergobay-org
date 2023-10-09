<script>
	import WalletButton from '$lib/WalletButton.svelte';
</script>

<div
	class="z-10 fixed flex p-4 items-center w-full justify-between backdrop-blur bg-opacity-10 shadow-sm"
	style="height:77px;border-bottom: 1px solid #80808045"
>
	<a href="/" class="flex items-center gap-2">
		<img src="ship.png" alt="" class="w-16">
		<div class="font-bold text-2xl">ErgoBay</div>
	</a>
	<div class="flex items-center gap-4">
		<WalletButton />
	</div>
</div>
