import { env } from './env'

export const CONTRACTS = {
  NFT: {
    address: env.nftContractAddress,
  },
  ERC20: {
    address: env.erc20ContractAddress,
  },
  IG_COIN: {
    address: env.igCoinContractAddress,
  },
} as const;
