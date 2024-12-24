import { jest } from '@jest/globals';
import '@testing-library/jest-dom';
import { TextEncoder } from 'util';

const mockToast = jest.fn();
const mockUseToast = jest.fn().mockReturnValue({ toast: mockToast });
jest.mock('@/hooks/use-toast', () => ({
  useToast: mockUseToast,
}));

process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS =
  '0xEf5615d6263B7E2588B35beeAa77650CE19fe8C0';
process.env.NEXT_PUBLIC_ERC20_CONTRACT_ADDRESS =
  '0xa913395a6cb65cc4df8052b50d9ce291d5f389a5';
process.env.NEXT_PUBLIC_IG_COIN_CONTRACT_ADDRESS =
  '0x7230f62050b9d780c0c8cee5ee2979089b4c9b80';
process.env.NEXT_PUBLIC_RPC_URL = 'https://dream-rpc.somnia.network';

global.TextEncoder = TextEncoder;

Object.defineProperty(window, 'ethereum', {
  value: {
    request: jest.fn(),
    on: jest.fn(),
    removeListener: jest.fn(),
    isMetaMask: true,
    isConnected: jest.fn().mockReturnValue(true),
    enable: jest.fn(),
  },
});

afterEach(() => {
  jest.clearAllMocks();
});
