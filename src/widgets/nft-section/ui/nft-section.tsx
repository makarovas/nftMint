'use client'

import { UserNFTs } from '@/features/nft-list/ui/user-nfts'

export function NFTSection() {
  return (
    <div className="flex flex-col gap-2 w-full max-w-md">
      <h2 className="text-xl font-semibold">Your NFTs</h2>
      <UserNFTs />
    </div>
  )
} 