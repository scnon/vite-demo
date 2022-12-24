import { Button, Card, Input, Space } from "antd"
import { useState } from "react"
import Web3 from "web3"
import { BigNumber } from 'bignumber.js'
import { useMetaMask } from 'metamask-react'
import Constants from "@/configs/constants"

const WalletInfo = (props: {}) => {
    const [input, setInput] = useState("")
    const [balance, setBalance] = useState("-")
    const [approve, setApprove] = useState("-")

    const { status, connect, account, chainId, ethereum } = useMetaMask()

    let web = new Web3(ethereum)
    // @ts-ignore
    let contract = new web.eth.Contract(Constants.USDTAbi, Constants.USDTAddress);

    const getBalance = async () => {
        let balance = await contract.methods.balanceOf(account).call()
        setBalance(Web3.utils.fromWei(balance))
        console.log(balance)
    }

    const getApprove = async () => {
        let approve = await contract.methods.allowance(account, Constants.GameAddress).call()
        setApprove(Web3.utils.fromWei(approve))
        console.log(approve)
    }

    const updateInfo = async () => {
        if (status === "connected") {
            getBalance()
            getApprove()
        }
    }

    const charge = async () => {
        if (status === "connected") {
            let value = Web3.utils.toWei(input)
            await contract.methods.approve(Constants.GameAddress, value).send({from: account})
            updateInfo()
        }
    }

    updateInfo()

    return (
        <Card title="Wallet Info" onLoad={updateInfo}>
            <Button onClick={connect}>Connect</Button>
            <p>Account: {account}</p>
            <p>Balance: {balance} USDT</p>
            <p>Approve: {approve} USDT</p>
            <div style={{display: 'flex'}}>
                <Button onClick={updateInfo}>Update</Button>
                <div style={{display: 'flex', alignItems: 'center', marginLeft: '20px'}}>
                <Input value={input} onChange={(e) => setInput(e.target.value)} />
                <div style={{marginLeft: '10px', marginRight: '10px'}}>USDT</div>
                <Button type="primary" onClick={charge}>Charge</Button>
                </div>
            </div>
        </Card>
    )
}

export default WalletInfo