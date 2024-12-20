import { somniaDevnet } from '@/shared/config/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { ReactNode } from 'react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

const { publicClient } = configureChains([somniaDevnet], [publicProvider()]);

const config = createConfig({
  autoConnect: false,
  publicClient,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export function TestWrapper({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={config}>{children}</WagmiConfig>
    </QueryClientProvider>
  );
}

export function renderHookWithProviders<Result, Props>(
  hook: (props: Props) => Result
) {
  return renderHook(hook, {
    wrapper: TestWrapper,
  });
}
