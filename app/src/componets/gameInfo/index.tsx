import { Button, Card } from "antd"
import { useMetaMask } from "metamask-react";
import Constants from "@/configs/constants";
import Web3 from "web3";
import { useState } from "react";

class Key {
    id: string = ''
    index: string = ''
    create: string = ''
    price: string = ''
    owner: string = ''
}

const GameInfo = () => {
    const [current, setCurrent] = useState<Key>(new Key())
    const [cashPool, setCashPool] = useState("0")
    const { status, connect, account, chainId, ethereum } = useMetaMask()

    let web = new Web3(ethereum)
    // @ts-ignore
    let contract = new web.eth.Contract(Constants.GameAbi, Constants.GameAddress);

    const getCurrent = async () => {
        let current = await contract.methods.current().call()
        setCurrent(current)
    }

    const getCashPool = async () => {
        let cashPool = await contract.methods.cashPool().call()
        setCashPool(cashPool)
    }

    const updateInfo = async () => {
        if (status === "connected") {
            getCurrent()
            getCashPool()
        }
    }

    const buy = async () => {
        if (status === "connected") {
            await contract.methods.buyKey(current.id).send({from: account, gas: 1000000})
        }
    }

    updateInfo()

    return (
        <Card title="Game Info" onLoad={updateInfo}>
            <p>Current Key: {current.id}</p>
            <p>Index: {current.index}</p>
            <p>Create: {current.create}</p>
            <p>Price: {Web3.utils.fromWei(current.price)} USDT</p>
            <p>Owner: {current.owner}</p>
            <p>Cash Pool: {Web3.utils.fromWei(cashPool)} USDT</p>
            <Button type="primary" onClick={buy}>Buy</Button>
        </Card>
    )
}

export default GameInfo