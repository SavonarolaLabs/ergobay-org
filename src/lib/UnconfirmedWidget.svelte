<script lang="ts">
	import { selected_wallet_ergo, utxos, assets } from '$lib/store/store.ts';
	import { notifier } from '@beyonk/svelte-notifications';
	import { sellTx } from './contract/sellTx.js';
	import { CONTRACT, DEV_PK } from './contract/sellForErg.js';

    export let sale:UnconfirmedSale
</script>

<div class="p-4 box w-full flex flex-wrap backdrop-blur-md bg-opacity-10 shadow-sm">
    <div class="grow flex flex-col justify-center">
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
    <div class="">
        <div>confirming...</div>
        <a target="_blank" href="https://explorer.ergoplatform.com/en/transactions/{sale.transactionId}" class="underline">
            Transaction ID
        </a>
    </div>
</div>

<style>
    .box{
        max-width: 600px;
        background: rgba(16, 16, 16, 0.0);
        border: 1px solid #80808045;
        border-top: 2px solid #a9a9a945;
        color: rgb(144, 144, 144);
    }
</style>
