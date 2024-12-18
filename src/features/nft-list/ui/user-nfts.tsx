'use client';

import { NFTCard } from '@/entities/nft';
import { NFT_ABI } from '@/shared/api/contracts/nft';
import { CONTRACTS } from '@/shared/config/contracts';
import { useI18n } from '@/shared/i18n/hooks';
import { useEffect, useState } from 'react';
import { useAccount, useContractRead } from 'wagmi';

export function UserNFTs() {
  const t = useI18n();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(typeof window !== 'undefined');
  }, []);

  const { address, isConnected } = useAccount();
  const { data: userTokens } = useContractRead({
    address: CONTRACTS.NFT.address as `0x${string}`,
    abi: NFT_ABI,
    functionName: 'tokensOf',
    args: [address!],
    enabled: Boolean(address),
  });

  if (!isClient) {
    return null;
  }

  if (!isConnected) {
    return null;
  }

  if (!userTokens?.length) {
    return (
      <div className='text-center py-8 text-gray-500'>{t('nft.noNFTs')}</div>
    );
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
      {userTokens.map((tokenId) => (
        <NFTCard key={tokenId.toString()} tokenId={Number(tokenId)} />
      ))}
    </div>
  );
}
