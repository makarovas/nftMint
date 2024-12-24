import { somniaDevnet } from '@/shared/config/chains';
import { configureChains, createConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

const { publicClient } = configureChains([somniaDevnet], [publicProvider()]);

export const wagmiConfig = createConfig({
  autoConnect: false,
  publicClient,
});
