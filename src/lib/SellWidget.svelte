<script lang="ts">
	import { unconfirmed_sales, selected_wallet_ergo, utxos, assets } from '$lib/store/store.ts';
	import { notifier } from '@beyonk/svelte-notifications';
	import { sellTx } from './contract/sellTx.js';
	import { CONTRACT, DEV_PK } from './contract/sellForErg.js';

	let editAssets = false;
	let additionalAssets: Array<Token> = [];
	let selectedAssets: Array<Token> = [];
	let priceInErg: undefined | number;

	async function addAssetsToggle() {
		if (!$selected_wallet_ergo || !window.ergoConnector[$selected_wallet_ergo]?.isConnected) {
			notifier.warning('Please connect a wallet.', 1500);
			return;
		}
		editAssets = !editAssets;
		if (!editAssets) {
			loadWalletBoxes($selected_wallet_ergo);
		}
	}

	function sumTokens(acc, e) {
		if (acc.some((t) => t.tokenId == e.tokenId)) {
			acc.find((t) => t.tokenId == e.tokenId).amount += e.amount;
			return acc;
		} else {
			return [...acc, e];
		}
	}

	async function loadWalletBoxes(wallet) {
		if (window.ergoConnector[wallet]?.isConnected) {
			const boxes = await ergo.get_utxos();
			utxos.set(JSON.parse(JSON.stringify(boxes)));
			assets.set(
				boxes
					.flatMap((b) =>
						b.assets.map((t) => {
							t.amount = BigInt(t.amount);
							return t;
						})
					)
					.reduce(sumTokens, [])
			);
			additionalAssets = $assets.filter(
				(a) => !selectedAssets.some((sa) => sa.tokenId == a.tokenId)
			);
		}
	}

	function selectToken(token) {
		additionalAssets = additionalAssets.filter((t) => t.tokenId != token.tokenId);
		selectedAssets = [...selectedAssets, Object.assign({}, token)];
	}

	function removeToken(token) {
		additionalAssets = [$assets.find((a) => a.tokenId == token.tokenId), ...additionalAssets];
		selectedAssets = selectedAssets.filter((t) => t.tokenId != token.tokenId);
	}

	function cleanUpSaleWidget() {
		editAssets = false;
		selectedAssets = [];
	}

	async function sellAssets() {
		if (!$selected_wallet_ergo || !window.ergoConnector[$selected_wallet_ergo]?.isConnected) {
			notifier.info('Connect a wallet.', 1500);
			return;
		}
		if (selectedAssets.length < 1) {
			notifier.info('Add Tokens.', 1500);
			return;
		}
		if (priceInErg == undefined) {
			notifier.info('Set a price.', 1500);
			return;
		}

		const myAddress = await ergo.get_change_address();
		const height = await ergo.get_current_height();
		const unsigned = sellTx(
			CONTRACT,
			myAddress,
			$utxos,
			height,
			DEV_PK,
			selectedAssets,
			BigInt(priceInErg * 10 ** 9)
		);
		const signed = await ergo.sign_tx(unsigned);

		const transactionId = await ergo.submit_tx(signed);

		const unconfirmedSale = {
			tokens: JSON.parse(
				JSON.stringify(
					selectedAssets.map((a) => {
						return { tokenId: a.tokenId, amount: a.amount.toString() };
					})
				)
			),
			seller: myAddress,
			tx: signed,
			transactionId,
			priceInErg
		};

		unconfirmed_sales.update((a) => {
			a.push(unconfirmedSale);
			return a;
		});
		localStorage.setItem('ergo_bay_unconfirmed_sales', JSON.stringify($unconfirmed_sales));

		cleanUpSaleWidget();

		//add tx + a
		//console.log(signed);
	}

	$: loadWalletBoxes($selected_wallet_ergo);
</script>

<div class="mt-4 p-4 box w-full flex flex-wrap backdrop-blur-md bg-opacity-10 shadow-sm">
	<div class="w-full flex flex-col my-2">
		{#each selectedAssets as token}
			<div class="w-full flex items-center gap-2 px-2 py-1">
				<div class="font-mono">
					{token.tokenId.substr(0, 3)}...{token.tokenId.substr(
						token.tokenId.length - 3,
						token.tokenId.length - 1
					)}
				</div>
				<div>
					<input class="p-2 py-1" type="number" min="1" bind:value={token.amount} />
				</div>
				<button on:click={() => removeToken(token)}>remove</button>
			</div>
		{/each}
	</div>
	<div class="w-full flex">
		<button class="grow p-4" on:click={addAssetsToggle}>
			{#if editAssets}
				-
			{:else}
				+
			{/if}
			add tokens
		</button>
		<div class="flex flex-col gap-2 justify-end" style="width:180px">
			<div>
				<input class="p-2 w-full" type="text" placeholder="Price in ERG" bind:value={priceInErg}/>
			</div>
			<div class="flex flex-col justify-end">
				<button class="btn p-4" on:click={sellAssets}> sell </button>
			</div>
		</div>
	</div>
	{#if editAssets}
		<div class="w-full assets mt-4">
			{#each additionalAssets as token}
				<button class="px-2 py-1 w-full flex justify-between gap-2" on:click={() => selectToken(token)}>
					<div class="font-mono">
						{token.tokenId.substr(0, 3)}...{token.tokenId.substr(
							token.tokenId.length - 3,
							token.tokenId.length - 1
						)}
					</div>
					<div>{token.amount}</div>
				</button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.box {
		max-width: 600px;
		background: rgba(16, 16, 16, 0.2);
		border: 1px solid #80808045;
		border-top: 2px solid #a9a9a945;
	}
	.assets>button:nth-child(even){
		background-color: rgba(255, 255, 255, 0.065);
	}
	.assets>button:hover{
		background-color: rgba(255, 255, 255, 0.17);
	}
</style>
