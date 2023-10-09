import { compile } from "@fleet-sdk/compiler"
import { Network} from "@fleet-sdk/core"
import { sellForErg } from "./sellForErg.js"


export function compileSellContract() {
    const tree = compile(sellForErg)
    return tree.toAddress(Network.Mainnet).toString()
}
