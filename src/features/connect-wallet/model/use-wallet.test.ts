import { renderHookWithProviders } from '@/test/test-utils';
import { jest } from '@jest/globals';
import { act } from '@testing-library/react';
import { useWallet } from './use-wallet';

const mockAddToast = jest.fn();
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    addToast: mockAddToast,
    toasts: [],
  }),
}));
jest.mock('wagmi');

const mockConnect = jest.fn(() => Promise.resolve({ account: '0x123' }));
const mockSwitchNetwork = jest.fn(() => Promise.resolve());
let mockConnected = false;
let mockChainId = 1;

jest.mock('wagmi', () => ({
  useConnect: () => ({
    connectAsync: mockConnect,
    isConnected: mockConnected,
    connectors: [
      {
        id: 'metaMask',
        name: 'MetaMask',
        connect: () => Promise.resolve({ account: '0x123' }),
      },
    ],
    pendingConnector: null,
    error: null,
  }),
  useNetwork: () => ({
    chain: { id: mockChainId },
    chains: [{ id: 1 }],
    switchNetworkAsync: mockSwitchNetwork,
    isLoading: false,
    pendingChainId: null,
    error: null,
  }),
  useAccount: () => ({
    isConnected: mockConnected,
    address: '0x123',
    isDisconnected: !mockConnected,
  }),
  useDisconnect: () => ({
    disconnect: jest.fn(),
  }),
}));

describe('useWallet', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockConnected = false;
    mockChainId = 2;
  });

  it('should handle successful connection', async () => {
    mockConnected = true;
    mockChainId = 1;
    const { result } = renderHookWithProviders(() => useWallet());

    await act(async () => {
      await result.current.connect({
        connector: {
          id: 'metaMask',
          name: 'MetaMask',
          ready: true,
          connect: () => Promise.resolve({ account: '0x123' }),
          chains: [{ id: 1, name: 'Mainnet' }],
          options: {},
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any,
      });
    });

    expect(result.current.isConnected).toBe(true);
    expect(mockAddToast).toHaveBeenCalledWith({
      title: 'Success',
      description: 'Wallet connected successfully',
    });
  });

  it('should handle network switch', async () => {
    const { result } = renderHookWithProviders(() => useWallet());

    await act(async () => {
      if (result.current.switchNetwork) {
        await result.current.switchNetwork(1);
      }
    });

    expect(result.current.isWrongNetwork).toBe(false);
    expect(mockAddToast).toHaveBeenCalledWith({
      title: 'Success',
      description: 'Network switched successfully',
    });
  });
});
