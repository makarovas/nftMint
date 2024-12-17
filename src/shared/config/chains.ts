import { Chain } from 'viem'
import { env } from '@/config/env'

export const somniaDevnet = {
  id: env.chainId,
  name: env.chainName,
  network: 'somnia-devnet',
  nativeCurrency: {
    decimals: 18,
    name: env.chainSymbol,
    symbol: env.chainSymbol,
  },
  rpcUrls: {
    default: {
      http: [env.rpcUrl],
    },
    public: {
      http: [env.rpcUrl],
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: env.blockExplorer },
  },
} as const satisfies Chain 