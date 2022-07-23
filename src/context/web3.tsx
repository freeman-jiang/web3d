import { createContext, useContext, ReactNode, useState } from "react";

// This is the type that consumers of useWeb3() see
interface Web3ContextObject {
  userAddress?: string;
  setUserAddress: (userAddress: string) => void;
}

// Means that components trying to access the context outside the provider will get {}
const Web3Context = createContext<Web3ContextObject>({} as Web3ContextObject);

export function useWeb3() {
  return useContext(Web3Context);
}

interface ProviderProps {
  children: ReactNode;
}

export function Web3Provider({ children }: ProviderProps) {
  const [userAddress, setUserAddress] = useState<string>("");
  const value = {
    userAddress,
    setUserAddress,
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
}
