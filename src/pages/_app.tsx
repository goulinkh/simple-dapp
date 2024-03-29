import { Inter } from "@next/font/google";
import type { AppProps } from "next/app";
import Head from "next/head";
import { MetaMaskWalletProvider } from "src/context/MetaMaskWalletContext";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Simple dApp</title>
        <meta
          name="description"
          content="A simple dApp to play around with MetaMask wallet."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={inter.className}>
        <MetaMaskWalletProvider>
          <Component {...pageProps} />
        </MetaMaskWalletProvider>
      </div>
    </>
  );
}
