import { wagmiConfig } from '@/config/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, renderHook, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { WagmiConfig } from 'wagmi';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export const renderHookWithProviders = <Result, Props>(
  hook: (props: Props) => Result,
  options?: Omit<RenderOptions, 'wrapper'>
) => renderHook(hook, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
