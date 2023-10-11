<script lang="ts">
	import { selected_wallet_ergo, utxos, assets } from '$lib/store/store.ts';
	import { notifier } from '@beyonk/svelte-notifications';
	import { sellTx } from './contract/sellTx.js';
	import { CONTRACT, DEV_PK } from './contract/sellForErg.js';

    export let sale:UnconfirmedSale
</script>

<div class="box w-full flex flex-col">
    <div class="w-full flex flex-col bg-black">
		{#each sale.tokens as token}
            <div class="flex gap-2">
                <div class="font-mono">{token.tokenId.substr(0, 3)}...{token.tokenId.substr(
                    token.tokenId.length - 3,
                    token.tokenId.length - 1
                )}</div>
                <div>
                    {token.amount}
                </div>
            </div>
        {/each}
	</div>
    <div class="w-full flex bg-red-900">
        <a target="_blank" href="https://explorer.ergoplatform.com/en/transactions/{sale.transactionId}" class="underline">
            Transaction ID
        </a>
    </div>
</div>

<style>
	.box {
		max-width: 600px;
	}
</style>
