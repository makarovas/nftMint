'use client';

import { somniaDevnet } from '@/config/chains';
import { useEffect } from 'react';
import { useAccount, useSwitchChain } from 'wagmi';
import { useToast } from './use-toast';

export function useNetworkCheck() {
  const { chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const { addToast } = useToast();

  useEffect(() => {
    if (chain && chain.id !== somniaDevnet.id) {
      addToast(
        'error',
        'Wrong Network',
        'Please switch to Somnia Devnet to use this application'
      );
      switchChain?.(somniaDevnet.id);
    }
  }, [chain, switchChain, addToast]);

  return {
    isCorrectNetwork: chain?.id === somniaDevnet.id,
  };
}
