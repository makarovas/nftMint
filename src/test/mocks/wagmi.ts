export const wagmiMocks = {
  useAccount: vi.fn().mockReturnValue({
    address: '0x0000000000000000000000000000000000000000',
    isConnecting: false,
    isDisconnected: true,
    isConnected: false,
  }),
  useConnect: vi.fn().mockReturnValue({
    connect: vi.fn(),
    connectors: [],
    error: null,
    isLoading: false,
    pendingConnector: null,
  }),
  useDisconnect: vi.fn().mockReturnValue({
    disconnect: vi.fn(),
  }),
  useNetwork: vi.fn().mockReturnValue({
    chain: null,
    chains: [],
  }),
  createConfig: vi.fn().mockReturnValue({}),
  configureChains: vi.fn().mockReturnValue({
    chains: [],
    publicClient: {},
  }),
};

vi.mock('wagmi', () => wagmiMocks);
