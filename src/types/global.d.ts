declare global {
  interface Window {
    ethereum: any;
  }
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_PRIVY_PUBLIC_KEY: string;
    }
  }
}

export {};
