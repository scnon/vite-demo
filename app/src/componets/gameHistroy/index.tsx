import { Card } from "antd"
import { useMetaMask } from "metamask-react";
import Constants from "@/configs/constants";
import { useState } from "react";
import Web3 from "web3";

const GameHistroy = () => {
    const [history, setHistory] = useState([])
    const { status, connect, account, chainId, ethereum } = useMetaMask()

    let web = new Web3(ethereum)
    // @ts-ignore
    let contract = new web.eth.Contract(Constants.GameAbi, Constants.GameAddress);

    const getHistory = async () => {
        let history = await contract.methods.getHistroy().call()
        setHistory(history)
    }

    getHistory()

    return (
        <Card title="Game History" onLoad={getHistory}>
            {
                history.map((item: any, index) => {
                    return (
                        <div key={index}>
                            <p>Key: {item.id}</p>
                            <p>Index: {item.index}</p>
                            <p>Create: {item.create}</p>
                            <p>Price: {Web3.utils.fromWei(item.price)} USDT</p>
                            <p>Cash: {Web3.utils.fromWei(item.cash)} USDT</p>
                            <p>Owner: {item.owner}</p>
                            <Card title="Masters">
                                {
                                    item.masters.map((master: string, index: number) => {
                                        return (
                                            <p key={index}>Master: {master}</p>
                                        )
                                    })
                                }
                            </Card>
                        </div>
                    )
                })
            }
        </Card>
    )
}

export default GameHistroy