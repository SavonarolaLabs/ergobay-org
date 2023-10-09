import { first } from "@fleet-sdk/common";
import { ErgoAddress, OutputBuilder, RECOMMENDED_MIN_FEE_VALUE, SAFE_MIN_BOX_VALUE, TransactionBuilder } from "@fleet-sdk/core";
import { SGroupElement, SLong, SSigmaProp } from "@fleet-sdk/serializer";

export function sellTx(contract: string, senderBase58PK: string, utxos: Array<any>, height: number,dev:string, assets:Array<any>, priceInNanoErg: bigint): any{
    const myAddr = ErgoAddress.fromBase58(senderBase58PK)
    const devAddr = ErgoAddress.fromBase58(dev)
    const output = new OutputBuilder(
        SAFE_MIN_BOX_VALUE + RECOMMENDED_MIN_FEE_VALUE * 2n,
        contract
    ).addTokens(assets)
    .setAdditionalRegisters({
        R4: SLong(priceInNanoErg).toHex(),
        R5: SSigmaProp(SGroupElement(first(myAddr.getPublicKeys()))).toHex(),
        R6: SSigmaProp(SGroupElement(first(devAddr.getPublicKeys()))).toHex(),
    });

    const unsignedMintTransaction = new TransactionBuilder(height)
        .from(utxos)
        .to(output)
        .sendChangeTo(myAddr)
        .payFee(RECOMMENDED_MIN_FEE_VALUE * 2n)
        .build()
        .toEIP12Object();

    return unsignedMintTransaction
}