import { useWallet } from '@/features/connect-wallet/model/use-wallet';
import { useToast } from '@/hooks/use-toast';
import { renderHookWithProviders } from '@/test/test-utils';
import { jest } from '@jest/globals';
import { act } from '@testing-library/react';
import { useMint } from './use-mint';

// Mock dependencies
jest.mock('@/features/connect-wallet/model/use-wallet');
jest.mock('@/hooks/use-toast');
jest.mock('wagmi');

describe('useMint', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle successful mint', async () => {
    const mockToast = jest.fn();
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
    (useWallet as jest.Mock).mockReturnValue({
      isConnected: true,
      isWrongNetwork: false,
    });

    const { result } = renderHookWithProviders(() => useMint());

    await act(async () => {
      await result.current.mint();
    });

    expect(mockToast).toHaveBeenCalledWith({
      title: 'Success',
      description: 'NFT minted successfully',
    });
  });

  it('should handle mint error when wallet not connected', async () => {
    const mockToast = jest.fn();
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
    (useWallet as jest.Mock).mockReturnValue({
      isConnected: false,
      isWrongNetwork: false,
    });

    const { result } = renderHookWithProviders(() => useMint());

    await act(async () => {
      await result.current.mint();
    });

    expect(mockToast).toHaveBeenCalledWith({
      title: 'Error',
      description: 'Please connect your wallet first',
      variant: 'error',
    });
  });
});
