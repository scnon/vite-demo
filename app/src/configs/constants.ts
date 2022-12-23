import usdtAbi from '../contracts/USDToken.json'
import gameAbi from '../contracts/KeyGame.json'


export default class Constants {
    static readonly USDTAbi = usdtAbi.abi
    static readonly USDTAddress = '0x594b0bD6A00e7B733dCFD855C554B621301D33d1'
    static readonly GameAbi = gameAbi.abi
    static readonly GameAddress = '0x5c0a5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e'
}