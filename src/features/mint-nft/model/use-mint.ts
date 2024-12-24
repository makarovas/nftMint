'use client';

import { useToast } from '@/hooks/use-toast';
import { ERC20_ABI } from '@/shared/api/contracts/erc20';
import { NFT_ABI } from '@/shared/api/contracts/nft';
import { CONTRACTS } from '@/shared/config/contracts';
import { useEffect, useState } from 'react';
import { parseEther } from 'viem';
import {
  useAccount,
  useBalance,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi';

export function useMint() {
  const [amount, setAmount] = useState(1);
  const [method, setMethod] = useState<'native' | 'erc20'>('native');
  const { address, isConnected } = useAccount();
  const { addToast } = useToast();

  const { data: userMintedAmount } = useContractRead({
    address: CONTRACTS.NFT.address as `0x${string}`,
    abi: NFT_ABI,
    functionName: 'mintedTokensPerUser',
    args: [address!],
    enabled: Boolean(address),
  });

  const { data: nativeBalance } = useBalance({
    address,
  });

  const { data: erc20Balance } = useBalance({
    address,
    token: CONTRACTS.ERC20.address as `0x${string}`,
  });

  const remainingMints = 50 - (userMintedAmount ? Number(userMintedAmount) : 0);
  const price = parseEther('0.1111') * BigInt(amount);
  const hasEnoughBalance =
    method === 'native'
      ? (nativeBalance?.value ?? 0n) >= price
      : (erc20Balance?.value ?? 0n) >= price;

  const { write: approve, data: approveData } = useContractWrite({
    address: CONTRACTS.ERC20.address as `0x${string}`,
    abi: ERC20_ABI,
    functionName: 'approve',
  });

  const { write: mintNative, data: mintNativeData } = useContractWrite({
    address: CONTRACTS.NFT.address as `0x${string}`,
    abi: NFT_ABI,
    functionName: 'mintNative',
  });

  const { write: mintWithERC20, data: mintERC20Data } = useContractWrite({
    address: CONTRACTS.NFT.address as `0x${string}`,
    abi: NFT_ABI,
    functionName: 'mintWithERC20',
  });

  const { isLoading: isApproving } = useWaitForTransaction({
    hash: approveData?.hash,
  });

  const { isLoading: isMintingNative } = useWaitForTransaction({
    hash: mintNativeData?.hash,
  });

  const { isLoading: isMintingERC20 } = useWaitForTransaction({
    hash: mintERC20Data?.hash,
  });

  const isMinting = isApproving || isMintingNative || isMintingERC20;

  const handleMint = async () => {
    try {
      if (method === 'native') {
        mintNative({
          args: [BigInt(amount)],
          value: price,
        });
      } else {
        const price = parseEther('0.1111') * BigInt(amount);
        approve({
          args: [CONTRACTS.NFT.address as `0x${string}`, price],
        });
        await new Promise((resolve) => {
          const interval = setInterval(() => {
            if (!isApproving) {
              clearInterval(interval);
              resolve(true);
            }
          }, 1000);
        });
        if (!isApproving) {
          mintWithERC20({
            args: [BigInt(amount)],
          });
        }
      }
    } catch (error) {
      addToast(
        'error',
        'Transaction failed',
        error instanceof Error ? error.message : 'Unknown error occurred'
      );
    }
  };

  useEffect(() => {
    if (mintNativeData?.hash) {
      addToast('success', 'NFT Minted', `Successfully minted ${amount} NFT(s)`);
    }
  }, [mintNativeData?.hash, amount, addToast]);

  useEffect(() => {
    if (approveData?.hash) {
      addToast(
        'success',
        'Approval Successful',
        'ERC20 tokens approved for minting'
      );
    }
  }, [approveData?.hash, addToast]);

  useEffect(() => {
    if (mintERC20Data?.hash) {
      addToast(
        'success',
        'NFT Minted',
        `Successfully minted ${amount} NFT(s) with ERC20`
      );
    }
  }, [mintERC20Data?.hash, amount, addToast]);

  return {
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
    mint: handleMint,
  };
}
