import { ErgoAddress, OutputBuilder, RECOMMENDED_MIN_FEE_VALUE, TransactionBuilder } from "@fleet-sdk/core";
import { SByte, SColl} from "@fleet-sdk/serializer";

const DEV_FEE_DENOMINATOR =100n //1%

export async function buyTx(contractBox:any, buyerBase58PK: string, buyerUtxos:Array<any>, height: number,tokenPrice:bigint,sellerBase58PK:string,devBase58PK:string): any{
    
    const buyerAddress = ErgoAddress.fromBase58(buyerBase58PK)

    const sellerBox = new OutputBuilder(
        tokenPrice-tokenPrice/DEV_FEE_DENOMINATOR,
        sellerBase58PK
    )
    .setAdditionalRegisters({
        R4: SColl(SByte, contractBox.boxId).toHex(),
    });

    const feeBox = new OutputBuilder(
        tokenPrice/DEV_FEE_DENOMINATOR,
        devBase58PK
    )

    const unsignedMintTransaction = new TransactionBuilder(height)
        .configureSelector((selector) => selector.ensureInclusion(contractBox.boxId))
        .from([contractBox,...buyerUtxos ])
        .to([sellerBox,feeBox])
        .sendChangeTo(buyerAddress)
        .payFee(RECOMMENDED_MIN_FEE_VALUE)
        .build()
        .toEIP12Object();

    return unsignedMintTransaction
}