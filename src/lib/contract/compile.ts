import { compile } from "@fleet-sdk/compiler"
import { Network} from "@fleet-sdk/core"
import { SellForErg } from "./SellForErg.js"


export function compileSellContract() {
    const tree = compile(SellForErg)
    return tree.toAddress(Network.Mainnet).toString()
}
