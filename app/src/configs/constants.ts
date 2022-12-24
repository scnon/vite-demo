import usdtAbi from '../contracts/USDToken.json'
import gameAbi from '../contracts/KeyGame.json'


export default class Constants {
    static readonly USDTAbi = usdtAbi.abi
    static readonly USDTAddress = '0xCc2Ec89743a506A36dFAcD8BeE7B5DeEbe5B8d0B'
    static readonly GameAbi = gameAbi.abi
    static readonly GameAddress = '0xC29F9915853b153f51aa7F34031806cD427143AE'
}