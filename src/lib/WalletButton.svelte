<script lang="ts">
	import { notifier } from '@beyonk/svelte-notifications';
	import { selected_wallet_ergo } from '../store/store.js';
	import Modal from './common/Modal.svelte';
	import { connectErgoWallet } from './common/wallet.js';
	let showModal = false;

	async function clickOnNautilusButton() {
		showModal = false;
		await connectErgoWallet('nautilus');
		if(!$selected_wallet_ergo){
			balanceErg = '0.00';
		}
	}

	let balanceInNanoErg = '0';
	let balanceErg = '0.00';
	async function loadBlance(wallet) {
		if (window.ergoConnector[wallet]?.isConnected) {
			balanceInNanoErg = await ergo.get_balance();
			balanceErg = (+balanceInNanoErg / 10 ** 9).toFixed(2);
		}
	}

	$: loadBlance($selected_wallet_ergo);
</script>

{#if +balanceErg > 0}
	<div>{balanceErg} Σ</div>
{/if}

{#if $selected_wallet_ergo}
	<button class="btn" on:click={clickOnNautilusButton}> Disconnect </button>
{:else}
	<button class="btn" on:click={() => (showModal = true)}> Connect Wallet </button>
{/if}

{#if showModal}
	<Modal bind:showModal>
		<div class="w-52 h-52">
			<div class="pl-1 uppercase font-bold text-xl text-slate-400">Ergo Wallets</div>
			<div class="w-full mt-6 mb-4">
				{#if !window.ergoConnector || !window.ergoConnector['nautilus']}
					<a
						href="https://chrome.google.com/webstore/detail/nautilus-wallet/gjlmehlldlphhljhpnlddaodbjjcchai"
						target="blank_"
						style="height:50px;"
						class="p-2 w-full flex justify-center items-center bg-white border-orange-900 text-black bg-green-100 rounded-md bg-opacity-30 hover:bg-opacity-80"
					>
						<div>Install Nautilus</div>
						<img style="height:2em;width:2em;" src="/wallets/nautilus.svg" alt="" />
					</a>
				{:else}
					<button
						on:click={clickOnNautilusButton}
						class:grayscale={!window.ergoConnector['nautilus']}
						class="btn w-full flex justify-center items-center"
					>
						<div>
							{#if $selected_wallet_ergo == 'nautilus'}
								Disconnect
							{/if}
							Nautilus
						</div>
						<img style="height:2em;width:2em;" src="/wallets/nautilus.svg" alt="" />
					</button>
				{/if}
			</div>
		</div>
		<span slot="btn">close</span>
	</Modal>
{/if}
