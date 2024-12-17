'use client';

import { NFTCard } from '@/entities/nft';
import { NFT_ABI } from '@/shared/api/contracts/nft';
import { CONTRACTS } from '@/shared/config/contracts';
import { useAccount, useContractRead } from 'wagmi';

export function UserNFTs() {
  const { address, isConnected } = useAccount();

  const { data: userTokens } = useContractRead({
    address: CONTRACTS.NFT.address as `0x${string}`,
    abi: NFT_ABI,
    functionName: 'tokensOf',
    args: [address!],
    enabled: Boolean(address),
  });

  if (!isConnected) {
    return null;
  }

  if (!userTokens?.length) {
    return (
      <div className='text-center py-8 text-gray-500'>
        You don&apos;t have any NFTs yet
      </div>
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
