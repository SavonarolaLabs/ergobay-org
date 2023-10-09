<script>
	import Modal from "./common/Modal.svelte";
	import KYA from "$lib/common/KYA.svelte"
	import { onMount } from "svelte";
	let showModal = false;

	onMount(()=>{
		const kya_accepted = localStorage.getItem('ergobay_kya_accepted')
		if(!kya_accepted){
			showModal =  true;
		}
	})

	function acceptKya(){
		localStorage.setItem('ergobay_kya_accepted', "true")
	}
</script>
<div class="w-full flex justify-around py-8 shadow-md" style="border-top: 1px solid #80808045">
	<div class="flex flex-col gap-4">
		<div class="text-slate-500 font-bold">Open Source</div>
		<div>
			<a href="https://github.com/c8e4/ergobay-org">Web Interface</a>
		</div>
		<div>
			<a href="https://github.com/c8e4/ergobay-org/blob/main/src/lib/contract/SellForErg.ts">Contract</a>
		</div>
		<div>
			<a href="https://github.com/SavonarolaLabs/ergo-web-template">Web Template</a>
		</div>
	</div>
    <div class="flex flex-col gap-4">
		<div class="text-slate-500 font-bold">Social</div>
		<div>
			<a href="https://discord.com/channels/832508980357627944/1159876443925393448">Discord</a>
		</div>
		<div>
			<a href="https://twitter.com/c8e4d2">Twitter</a>
		</div>
	</div>
    <div class="flex flex-col gap-4">
		
		<div class="text-slate-500 font-bold">KYA</div>
		<div>
			<button on:click={()=>showModal = true}>Know Your Assumptions</button>
		</div>
	</div>
</div>

{#if showModal}
	<Modal bind:showModal onBtnClick={acceptKya}>
		<KYA></KYA>
		<span slot="btn">i understand and accept the kya</span>
	</Modal>
{/if}

<style>
	button:hover{
		background: unset;
		color: unset;
	}
</style>
