import { env } from './env'

export const CONTRACTS = {
  NFT: {
    address: env.nftContractAddress,
  },
  ERC20: {
    address: env.erc20ContractAddress,
  },
} as const 