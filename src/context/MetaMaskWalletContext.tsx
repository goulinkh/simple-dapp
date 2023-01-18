import { ethers } from "ethers";
import { useRouter } from "next/router";
import { createContext, ReactElement, useEffect, useState } from "react";

export type Wallet = {
  balance: string;
  network: { name: string };
  address: string;
};

type LoadingWalletContext = {};
type EmptyWalletContext = {
  connected: false;
};
type MetaMaskWalletContext =
  | LoadingWalletContext
  | EmptyWalletContext
  | {
      connected: true;
      wallet: Wallet;
    };

const defaultMetaMaskWalletContext: MetaMaskWalletContext = {};
export const MetaMaskWalletContext = createContext(
  defaultMetaMaskWalletContext
);

const LOGIN_ROUTE = "/connect";

export const MetaMaskWalletProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>();

  const [connected, setConnected] = useState<boolean | undefined>();
  const [wallet, setWallet] = useState<Wallet>();

  const router = useRouter();

  // TODO: connection error handling
  const connect = async () => {
    if (!provider) return;
    // force the usage of the Goedi blockchain
    await provider.send("wallet_switchEthereumChain", [{ chainId: "0x5" }]);
    // prompt use for account connections
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    setSigner(signer);

    setWallet({
      balance: ethers.utils.formatEther(await signer.getBalance()),
      address: await signer.getAddress(),
      network: { name: provider.network.name },
    });
    if (!connected) setConnected(true);
    if (router.asPath.includes(LOGIN_ROUTE)) {
      // redirect to the home page
      router.push((router.query.returnUrl as string) || "/");
    }
  };

  const checkConnection = async (provider: ethers.providers.Web3Provider) => {
    const connectedAccounts: string[] = await provider.send("eth_accounts", []);
    const alreadyConnected = connectedAccounts.length > 0;
    if (alreadyConnected) {
      // connect automatically if already connected to the wallet
      connect();
    } else {
      setConnected(false);
    }
  };

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    setProvider(provider);
    // window.ethereum.on("accountsChanged", () => checkConnection(provider));
  }, []);

  useEffect(() => {
    // once the provider is ready we get the wallet details
    if (provider) {
      checkConnection(provider);
    }
  }, [provider]);

  // redirect to the connection page, if not connected
  useEffect(() => {
    if (connected === false && !router.asPath.includes(LOGIN_ROUTE)) {
      router.push({
        pathname: LOGIN_ROUTE,
        // TODO: test
        query: { returnUrl: router.asPath },
      });
    }
  }, [connected, router]);

  return (
    <MetaMaskWalletContext.Provider
      value={{ connect, connected, wallet, signer, provider }}
    >
      {children}
    </MetaMaskWalletContext.Provider>
  );
};
