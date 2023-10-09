import { first } from "@fleet-sdk/common";
import { ErgoAddress, OutputBuilder, RECOMMENDED_MIN_FEE_VALUE, SAFE_MIN_BOX_VALUE, TransactionBuilder } from "@fleet-sdk/core";
import { SGroupElement, SLong, SSigmaProp } from "@fleet-sdk/serializer";

export function sellTx(contract: string, sellerBase58PK: string, sellerUtxos: Array<any>, height: number,devBase58PK:string, tokensForSale:Array<any>, priceInNanoErg: bigint): any{
    const sellerAddress = ErgoAddress.fromBase58(sellerBase58PK)
    const devAddress = ErgoAddress.fromBase58(devBase58PK)
    
    const contractBox = new OutputBuilder(
        SAFE_MIN_BOX_VALUE,
        contract
    ).addTokens(tokensForSale)
    .setAdditionalRegisters({
        R4: SLong(priceInNanoErg).toHex(),
        R5: SSigmaProp(SGroupElement(first(sellerAddress.getPublicKeys()))).toHex(),
        R6: SSigmaProp(SGroupElement(first(devAddress.getPublicKeys()))).toHex(),
    });

    const unsignedMintTransaction = new TransactionBuilder(height)
        .from(sellerUtxos)
        .to(contractBox)
        .sendChangeTo(sellerAddress)
        .payFee(RECOMMENDED_MIN_FEE_VALUE)
        .build()
        .toEIP12Object();

    return unsignedMintTransaction
}