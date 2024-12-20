import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(t|j)sx?$': ['babel-jest', { useESM: true }],
  },
  transformIgnorePatterns: ['/node_modules/(?!(wagmi|@wagmi|@tanstack|viem)/)'],
  extensionsToTreatAsEsm: ['.ts', '.tsx', '.jsx'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
};

export default createJestConfig(customJestConfig);

// const createJestConfig = nextJest({
//   dir: './',
// });

// /** @type {import('jest').Config} */
// const config = {
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
//   testEnvironment: 'jest-environment-jsdom',
//   moduleNameMapper: {
//     '^@/(.*)$': '<rootDir>/src/$1',
//   },
//   testTimeout: 20000,
// };

// import '@testing-library/jest-dom';

// // Мок для window.matchMedia
// Object.defineProperty(window, 'matchMedia', {
//   writable: true,
//   value: jest.fn().mockImplementation((query) => ({
//     matches: false,
//     media: query,
//     onchange: null,
//     addListener: jest.fn(),
//     removeListener: jest.fn(),
//     addEventListener: jest.fn(),
//     removeEventListener: jest.fn(),
//     dispatchEvent: jest.fn(),
//   })),
// });

// // Мок для ResizeObserver
// global.ResizeObserver = jest.fn().mockImplementation(() => ({
//   observe: jest.fn(),
//   unobserve: jest.fn(),
//   disconnect: jest.fn(),
// }));

// // Мок для wagmi
// jest.mock('wagmi', () => ({
//   useAccount: jest.fn().mockReturnValue({
//     address: '0x0000000000000000000000000000000000000000',
//     isConnecting: false,
//     isDisconnected: true,
//     isConnected: false,
//   }),
//   useConnect: jest.fn().mockReturnValue({
//     connect: jest.fn(),
//     connectors: [],
//     error: null,
//     isLoading: false,
//     pendingConnector: null,
//   }),
//   useDisconnect: jest.fn().mockReturnValue({
//     disconnect: jest.fn(),
//   }),
//   useNetwork: jest.fn().mockReturnValue({
//     chain: null,
//     chains: [],
//   }),
// }));

// // Мок для viem
// jest.mock('viem', () => ({
//   createPublicClient: jest.fn(),
//   http: jest.fn(),
// }));
