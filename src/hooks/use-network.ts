'use client'

import { useEffect } from 'react'
import { useNetwork, useSwitchNetwork } from 'wagmi'
import { somniaDevnet } from '@/config/chains'
import { useToast } from './use-toast'

export function useNetworkCheck() {
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()
  const { addToast } = useToast()

  useEffect(() => {
    if (chain && chain.id !== somniaDevnet.id) {
      addToast(
        'error',
        'Wrong Network',
        'Please switch to Somnia Devnet to use this application'
      )
      switchNetwork?.(somniaDevnet.id)
    }
  }, [chain, switchNetwork, addToast])

  return {
    isCorrectNetwork: chain?.id === somniaDevnet.id
  }
} 