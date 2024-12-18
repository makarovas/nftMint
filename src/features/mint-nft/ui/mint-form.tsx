'use client';

import { useI18n } from '@/shared/i18n/hooks';
import { Button } from '@/shared/ui/button';
import { useEffect, useState } from 'react';
import { formatEther } from 'viem';
import { useMint } from '../model/use-mint';
import { MintMethod } from './mint-method';

export function MintForm() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(typeof window !== 'undefined');
  }, []);

  const t = useI18n();

  const {
    amount,
    setAmount,
    method,
    setMethod,
    handleMint,
    isMinting,
    isApproving,
    remainingMints,
    hasEnoughBalance,
    price,
    isConnected,
  } = useMint();

  if (!isClient) {
    return null;
  }

  if (!isConnected) return null;

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <p className='text-sm text-gray-500'>
          {t(
            remainingMints === 1
              ? 'mint.remainingMints'
              : 'mint.remainingMintsPlural',
            {
              count: remainingMints,
            }
          )}
        </p>
        <p className='text-sm text-gray-500'>
          {t('mint.price', {
            amount: formatEther(price),
            currency:
              method === 'native'
                ? t('mint.methods.native')
                : t('mint.methods.erc20'),
          })}
        </p>
        {!hasEnoughBalance && (
          <p className='text-sm text-red-500'>
            {t('mint.insufficientBalance')}
          </p>
        )}
      </div>

      <MintMethod selected={method} onChange={setMethod} />

      <div className='flex items-center gap-2'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => setAmount((prev) => Math.max(1, prev - 1))}
        >
          {t('mint.buttons.decrement')}
        </Button>
        <span className='min-w-[2rem] text-center'>{amount}</span>
        <Button
          variant='outline'
          size='sm'
          onClick={() =>
            setAmount((prev) => Math.min(remainingMints, prev + 1))
          }
        >
          {t('mint.buttons.increment')}
        </Button>
      </div>

      <Button
        onClick={handleMint}
        disabled={isMinting || remainingMints === 0 || !hasEnoughBalance}
        className='w-full'
      >
        {isMinting
          ? isApproving
            ? t('mint.buttons.approving')
            : t('mint.buttons.minting')
          : t(amount === 1 ? 'mint.buttons.mint' : 'mint.buttons.mintPlural', {
              count: amount,
            })}
      </Button>
    </div>
  );
}
