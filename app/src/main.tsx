import React from 'react'
import ReactDOM from 'react-dom/client'
import { MetaMaskProvider } from "metamask-react";
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MetaMaskProvider>
      <App />
    </MetaMaskProvider>
  </React.StrictMode>,
)