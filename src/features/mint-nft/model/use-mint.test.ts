import { renderHookWithProviders } from '@/test/test-utils';
import { jest } from '@jest/globals';
import { act } from '@testing-library/react';
import { useMint } from './use-mint';

let mockWalletState = {
  isConnected: true,
  isWrongNetwork: false,
};

jest.mock('@/features/connect-wallet/model/use-wallet', () => ({
  useWallet: () => mockWalletState,
}));
jest.mock('@/hooks/use-toast');
jest.mock('wagmi');

const mockAddToast = jest.fn();
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    addToast: mockAddToast,
    toasts: [],
  }),
}));

const mockWrite = jest.fn(() => Promise.resolve({ hash: '0x123' }));

jest.mock('wagmi', () => ({
  useContractWrite: () => ({
    writeAsync: mockWrite,
    isLoading: false,
    isSuccess: true,
    error: null,
    data: { hash: '0x123' },
  }),
  usePrepareContractWrite: () => ({
    config: {
      mode: 'prepared',
      request: {
        abi: [],
        address: '0x123',
        functionName: 'mint',
      },
    },
    isError: false,
    error: null,
  }),
  useWaitForTransaction: () => ({
    isLoading: false,
    isSuccess: true,
    error: null,
    data: { status: 1 },
  }),
}));

describe('useMint', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockWrite.mockClear();
  });

  it('should handle successful mint', async () => {
    mockWalletState = {
      isConnected: true,
      isWrongNetwork: false,
    };

    const { result } = renderHookWithProviders(() => useMint());

    await act(async () => {
      await result.current.mint();
    });
  });

  it('should handle mint error when wallet not connected', async () => {
    mockWalletState = {
      isConnected: false,
      isWrongNetwork: false,
    };

    const { result } = renderHookWithProviders(() => useMint());

    await act(async () => {
      await result.current.mint();
    });
  });
});
