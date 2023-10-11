<script lang="ts">
	import { ErgoAddress, SSigmaProp } from "@fleet-sdk/core";
	import { buyTx } from "./contract/buyTx.js";
	import { selected_wallet_ergo } from "./store/store.js";
	import { notifier } from "@beyonk/svelte-notifications";

    export let offer;

    async function buy(){
		if (!$selected_wallet_ergo || !window.ergoConnector[$selected_wallet_ergo]?.isConnected) {
			notifier.info('Connect a wallet.', 1500);
			return;
		}

		const myAddress = await ergo.get_change_address();
		const utxos = await ergo.get_utxos();
		const height = await ergo.get_current_height();
        
        const priceInNanoErg = BigInt(offer.additionalRegisters.R4.renderedValue);
        const sellerAddress = ErgoAddress.fromPublicKey(offer.additionalRegisters.R5.serializedValue.substring(4)).toString()
        const devAddress = ErgoAddress.fromPublicKey(offer.additionalRegisters.R6.serializedValue.substring(4)).toString()

        let box = JSON.parse(JSON.stringify(offer))
        for(const [k,v] of Object.entries(box.additionalRegisters)){
            box.additionalRegisters[k] = v.serializedValue;
        }

        const unsigned = await buyTx(box, myAddress, utxos, height, priceInNanoErg, sellerAddress, devAddress)

		const signed = await ergo.sign_tx(unsigned);
		const transactionId = await ergo.submit_tx(signed);
        console.log(transactionId);
    }

</script>

<div class="p-4 box w-full flex flex-wrap backdrop-blur-md bg-opacity-10 shadow-sm">
    <div class="grow flex flex-col justify-center">
        {#each offer.assets as token}
            <div class="flex gap-2">
                <div class="font-mono">{token.tokenId.substr(0, 3)}...{token.tokenId.substr(
                    token.tokenId.length - 3,
                    token.tokenId.length - 1
                )}</div>
                <div>{token.amount}
                </div>
            </div>
        {/each}
    </div>
    <div class="flex flex-col justify-end" style="min-width:180px">
        <div class="p-4 pt-1 text-center">
        {offer.additionalRegisters.R4.renderedValue/10**9} ERG
        </div>
    
        <button class="btn p-4" on:click={buy}>
            buy
        </button>
    </div>
</div>

<style>
    .box{
        max-width: 600px;
        background: rgba(16, 16, 16, 0.2);
        border: 1px solid #80808045;
        border-top: 2px solid #a9a9a945;
    }
</style>