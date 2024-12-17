import { env } from './env'
import { Chain } from 'viem'

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