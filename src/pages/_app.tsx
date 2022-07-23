import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/theme/.";
import { Web3Provider } from "src/context/web3";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Web3D</title>
      </Head>
      <ChakraProvider theme={theme}>
        <Web3Provider>
          <Component {...pageProps} />
        </Web3Provider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
