'use client';

import { NFT_ABI } from '@/shared/api/contracts/nft';
import { CONTRACTS } from '@/shared/config/contracts';
import { useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';
import type { NFTCardProps, NFTMetadata } from '../model/types';

export function NFTCard({ tokenId }: NFTCardProps) {
  const [metadata, setMetadata] = useState<NFTMetadata | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { data: tokenURI } = useContractRead({
    address: CONTRACTS.NFT.address as `0x${string}`,
    abi: NFT_ABI,
    functionName: 'tokenURI',
    args: [BigInt(tokenId)],
  });

  useEffect(() => {
    async function fetchMetadata() {
      if (!tokenURI || typeof tokenURI !== 'string') return;

      try {
        setIsLoading(true);
        const response = await fetch(tokenURI);
        if (!response.ok) throw new Error('Failed to fetch metadata');

        const contentType = response.headers.get('content-type');

        if (contentType?.includes('application/json')) {
          const data = await response.json();
          setMetadata(data);
        } else if (
          contentType?.includes('image/svg+xml') ||
          tokenURI.startsWith('data:image/svg+xml')
        ) {
          // Если получаем SVG напрямую
          setMetadata({
            image: tokenURI,
            name: `Token #${tokenId}`,
            description: 'SVG NFT',
          });
        } else {
          // Для других форматов изображений
          setMetadata({
            image: tokenURI,
            name: `Token #${tokenId}`,
            description: 'NFT',
          });
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load NFT metadata'
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchMetadata();
  }, [tokenURI, tokenId]);

  return (
    <div className='flex flex-col gap-2 p-4 border rounded-lg'>
      <div className='aspect-square w-full bg-gray-100 rounded-md overflow-hidden'>
        {isLoading ? (
          <div className='w-full h-full flex items-center justify-center'>
            Loading...
          </div>
        ) : error ? (
          <div className='w-full h-full flex items-center justify-center text-red-500'>
            {error}
          </div>
        ) : metadata?.image ? (
          <img
            src={metadata.image}
            alt={metadata.name || `Token #${tokenId}`}
            className='w-full h-full object-cover'
          />
        ) : (
          <div className='w-full h-full flex items-center justify-center'>
            #{tokenId}
          </div>
        )}
      </div>
      <div className='flex flex-col gap-1'>
        <span className='text-sm font-medium'>
          {metadata?.name || `Token #${tokenId}`}
        </span>
        {metadata?.description && (
          <p className='text-xs text-gray-500'>{metadata.description}</p>
        )}
      </div>
    </div>
  );
}
