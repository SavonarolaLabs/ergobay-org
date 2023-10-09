<script lang="ts">
	import Contract from "$lib/Contract.svelte";
	import Landing from "$lib/Landing.svelte"
	let loading = true;
</script>

<div class="h-full flex flex-col grow main-page">
	{#if loading}
	<div class="grow flex flex-col items-center justify-center">
		<img class="unselectable" src="ship.png" style="width:250px;" alt="">
		<div class="font-mono mt-4">loading...</div>
	</div>
	{:else}
		<Landing></Landing>
		<Contract></Contract>
	{/if}
</div>

<style lang="postcss">
	:global(html) {
		background-color: #1b2845;
		background-image: linear-gradient(315deg, #1b2845 0%, #274060 74%);
		background-image: linear-gradient(315deg, #1b2845 0%, #274060 74%);
		background-image: radial-gradient(circle, #2a2a2a, #1b2845);
		/* background-image: linear-gradient(315deg, #4B0082 0%, #000000 74%); */

		min-height: 100vh;
	}
	:global(body) {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		color: #d1d1d1;
		/* color: #C0A080; */
	}
	:global(button.btn) {
		background-color: #d1d1d1;
		color: #1b2845;
		padding: 10px 20px;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		transition: 0.3s;
		text-transform: uppercase;
		font-weight: 500;
	}
	:global(button.btn:hover) {
		background-color: #b1b1b1; /* Slightly darker for hover effect */
	}
	.main-page {
		background-position: cover;
		background-repeat: no-repeat;
	}
</style>
