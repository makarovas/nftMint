/* eslint-disable @typescript-eslint/no-explicit-any */
interface Window {
  ethereum: {
    request: (args: { method: string; params?: Array<any> }) => Promise<any>;
    on: (event: string, handler: (...args: any[]) => void) => void;
    removeListener: (event: string, handler: (...args: any[]) => void) => void;
  };
}
