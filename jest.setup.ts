import { jest } from '@jest/globals';
import '@testing-library/jest-dom';

Object.defineProperty(window, 'ethereum', {
  value: {
    request: jest.fn(),
    on: jest.fn(),
    removeListener: jest.fn(),
  },
});
