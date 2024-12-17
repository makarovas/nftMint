'use client';

import { somniaDevnet } from '@/config/chains';
import { useI18n } from '@/shared/i18n/hooks/use-translations';
import { Button } from '@/shared/ui/button';
import { useWallet } from '../model/use-wallet';

export function ConnectButton() {
  const t = useI18n();

  const {
    address,
    isConnected,
    connect,
    connectors,
    isConnecting,
    pendingConnector,
    disconnect,
    isWrongNetwork,
    switchNetwork,
    isSwitching,
  } = useWallet();

  if (isConnected) {
    return (
      <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-2'>
          <span className='text-sm'>Connected: {address}</span>
          <Button variant='outline' size='sm' onClick={() => disconnect()}>
            Disconnect
          </Button>
        </div>
        {isWrongNetwork && (
          <Button
            onClick={() => switchNetwork?.(somniaDevnet.id)}
            disabled={false}
            variant='default'
            size='sm'
          >
            {isSwitching ? 'Switching...' : 'Switch to Somnia Devnet'}
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-2'>
      {connectors.map((connector) => (
        <Button
          key={connector.id}
          onClick={() => connect({ connector })}
          disabled={isConnecting}
          className='w-full'
        >
          Connect {connector.name}
          {isConnecting &&
            connector.id === pendingConnector?.id &&
            t('wallet.connecting')}
        </Button>
      ))}
    </div>
  );
}
