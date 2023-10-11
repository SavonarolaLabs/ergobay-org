export const sellForErg = `
{
    val priceNanoErg     	= SELF.R4[Long].get         // token sale price in nanoErg
    val sellerPK 			= SELF.R5[SigmaProp].get // Public Key of the token seller
    val devPK			    = SELF.R6[SigmaProp].get // dev Public Key

    val feeDenom 			= 100000L
    val feeNum   			= 1000L                     // 1% fee
    val feeInNanoErg   		= (priceNanoErg.toBigInt * feeNum.toBigInt) / feeDenom.toBigInt
    val onlyOneBoxSpent		= (OUTPUTS(0).R4[Coll[Byte]].get == SELF.id)
    val sellerHappy			= (OUTPUTS(0).value >= priceNanoErg - feeInNanoErg) && (OUTPUTS(0).propositionBytes == sellerPK.propBytes)
    val feePaid				= (feeInNanoErg == 0) ||
                              (OUTPUTS(1).value >= feeInNanoErg && OUTPUTS(1).propositionBytes == devPK.propBytes)
    sigmaProp(onlyOneBoxSpent && sellerHappy && feePaid) || sellerPK
}`

export const CONTRACT  = '7BPUsYJNMQp6zCrqGw8qeWqkxdRxd3WYiZxDsNaKdnRyhdGabXEi2bd1PTSNQGSWcCfZkSobKQ9Ua4fvi3b5Siaa65mfnVw4aLzYPUvazLR31P5X2tTy3P5fy93aBKe8Qk3x4oSb5zZfBuAV2nPnHXMqzfzJ1yVEewFBGza3wLwuaQtFU';
export const DEV_PK    = '9ffXZz5AovJvapPo63TGwdNaRPMUiHo2UkqGavmDGzrUERY9qJ3'