'use client'

import { useAccount, useConnect, useDisconnect, useNetwork, useSwitchNetwork } from 'wagmi'
import { somniaDevnet } from '@/config/chains'

export function useWallet() {
  const { address, isConnected } = useAccount()
  const { connect, connectors, isLoading: isConnecting, pendingConnector } = useConnect()
  const { disconnect } = useDisconnect()
  const { chain } = useNetwork()
  const { switchNetwork, isLoading: isSwitching } = useSwitchNetwork()

  const isWrongNetwork = chain?.id !== somniaDevnet.id

  return {
    address,
    isConnected,
    connect,
    connectors,
    isConnecting,
    pendingConnector,
    disconnect,
    isWrongNetwork,
    switchNetwork,
    isSwitching
  }
} 