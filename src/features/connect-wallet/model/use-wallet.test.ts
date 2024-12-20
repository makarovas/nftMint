import { useToast } from '@/hooks/use-toast';
import { renderHookWithProviders } from '@/test/test-utils';
import { jest } from '@jest/globals';
import { act } from '@testing-library/react';
import { useWallet } from './use-wallet';

jest.mock('@/hooks/use-toast');
jest.mock('wagmi');

describe('useWallet', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle successful connection', async () => {
    const mockToast = jest.fn();
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });

    const { result } = renderHookWithProviders<ReturnType<typeof useWallet>, void>(() => useWallet());

    await act(async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      result.current.connect({ connector: {} as any });
    });

    expect(result.current.isConnected).toBe(true);
    expect(mockToast).toHaveBeenCalledWith({
      title: 'Success',
      description: 'Wallet connected successfully',
    });
  });

  it('should handle network switch', async () => {
    const mockToast = jest.fn();
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });

    const { result } = renderHookWithProviders<ReturnType<typeof useWallet>, void>(() => useWallet());

    await act(async () => {
      await result.current.switchNetwork?.(1);
    });

    expect(result.current.isWrongNetwork).toBe(false);
    expect(mockToast).toHaveBeenCalledWith({
      title: 'Success',
      description: 'Network switched successfully',
    });
  });
});
