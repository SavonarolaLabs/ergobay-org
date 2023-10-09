export const SellForErg = `
{
    val priceNanoErg     	= SELF.R4[Long].get         // token sale price in nanoErg
    val sellerPK 			= SELF.R5[GroupElement].get // Public Key of the token seller
    val devPK			    = SELF.R6[GroupElement].get // dev Public Key

    val feeDenom 			= 100000L
    val feeNum   			= 1000L                     // 1% fee
    val feeInNanoErg   		= (priceNanoErg.toBigInt * feeNum.toBigInt) / feeDenom.toBigInt
    val onlyOneBoxSpent		= (OUTPUTS(0).R4[Coll[Byte]].get == SELF.id)
    val sellerHappy			= (OUTPUTS(0).value >= priceNanoErg - feeInNanoErg) && (OUTPUTS(0).propositionBytes == sellerPK.propBytes)
    val feePaid				= (feeInNanoErg == 0) ||
                              (OUTPUTS(1).value >= feeInNanoErg && OUTPUTS(1).propositionBytes == devPK.propBytes)
    sigmaProp(onlyOneBoxSpent && sellerHappy && feePaid) || proveDlog(sellerPK)
}`