if (!process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS) {
  throw new Error('NEXT_PUBLIC_NFT_CONTRACT_ADDRESS is not defined');
}

if (!process.env.NEXT_PUBLIC_ERC20_CONTRACT_ADDRESS) {
  throw new Error('NEXT_PUBLIC_ERC20_CONTRACT_ADDRESS is not defined');
}

if (!process.env.NEXT_PUBLIC_IG_COIN_CONTRACT_ADDRESS) {
  throw new Error('NEXT_PUBLIC_IG_COIN_CONTRACT_ADDRESS is not defined');
}

if (!process.env.NEXT_PUBLIC_RPC_URL) {
  throw new Error('NEXT_PUBLIC_RPC_URL is not defined');
}

export const env = {
  nftContractAddress: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS,
  erc20ContractAddress: process.env.NEXT_PUBLIC_ERC20_CONTRACT_ADDRESS,
  igCoinContractAddress: process.env.NEXT_PUBLIC_IG_COIN_CONTRACT_ADDRESS,
  rpcUrl: process.env.NEXT_PUBLIC_RPC_URL,
  chainId: 50311,
  chainName: 'Somnia Devnet',
  chainSymbol: 'STT',
  blockExplorer: 'https://sepolia.etherscan.io',
} as const;
