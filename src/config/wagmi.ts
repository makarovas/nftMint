import { somniaDevnet } from '@/config/chains';
import { configureChains, createClient } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [somniaDevnet],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  provider,
});

export default client;
