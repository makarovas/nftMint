'use client';

import { somniaDevnet } from '@/config/chains';
import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi';

export function useWallet() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, status: connectStatus } = useConnect();
  const isConnecting = connectStatus === 'pending';
  const { disconnect } = useDisconnect();
  const { chain } = useAccount();
  const { switchChain, status: switchStatus } = useSwitchChain();
  const isSwitching = switchStatus === 'pending';

  const isWrongNetwork = chain?.id !== somniaDevnet.id;

  return {
    address,
    isConnected,
    connect,
    connectors,
    isConnecting,
    disconnect,
    isWrongNetwork,
    switchChain,
    isSwitching,
  };
}
