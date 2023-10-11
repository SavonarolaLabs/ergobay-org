import { fetchContractBoxes } from "$lib/api-explorer/explorer.js";
import { CONTRACT } from "$lib/contract/sellForErg.js";
import { writable, type Writable } from "svelte/store";

export type Token = {
    amount: bigint,
    tokenId: string
}

export type UnconfirmedSale = {
    tokens: Array<Token>
    seller: string
    tx: any
    transactionId: string
    priceInErg: string
}

export const selected_wallet_ergo = writable('');
export const utxos = writable([]);
export const assets = writable([]);

export const offers = writable([]);

export const unconfirmed_sales:Writable<Array<UnconfirmedSale>> = writable([]);

export function loadStoreFromLocalStorage(){
    const ergo_bay_unconfirmed_sales = localStorage.getItem('ergo_bay_unconfirmed_sales')
    if(ergo_bay_unconfirmed_sales){
        unconfirmed_sales.set(JSON.parse(ergo_bay_unconfirmed_sales))
    }
}

export async function loadOffers(){
    const boxes = await fetchContractBoxes(CONTRACT);
    offers.set(boxes);
    removeConfirmedBoxes(boxes);
}

function removeConfirmedBoxes(confirmedBoxes){
    unconfirmed_sales.update(a =>{
        return a.filter(x => !confirmedBoxes.some(box => box.transactionId == x.transactionId))
    })
}