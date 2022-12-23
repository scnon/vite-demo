import { Space } from 'antd'
import { useState } from 'react'
import Web3 from 'web3'
import GameInfo from './componets/gameInfo'
import WalletInfo from './componets/walletInfo'

function App() {

  return (
    <div className="App">
      <WalletInfo />
      <div style={{height: '20px'}}></div>
      <GameInfo />
    </div>
  )
}

export default App
