'use client';

import { ConnectButton } from '@/features/connect-wallet';
import { MintForm } from '@/features/mint-nft';

export function MintSection() {
  return (
    <div className='flex flex-col gap-6 w-full max-w-md'>
      <div className='flex flex-col gap-2'>
        <h2 className='text-xl font-semibold'>Connect Wallet</h2>
        <ConnectButton />
      </div>
      <div className='flex flex-col gap-2'>
        <h2 className='text-xl font-semibold'>Mint NFT</h2>
        <MintForm />
      </div>
    </div>
  );
}
