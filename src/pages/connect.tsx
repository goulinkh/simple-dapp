import { Web3Provider } from "@ethersproject/providers";
import { useContext, useEffect, useState } from "react";
import { PrimaryButton } from "src/components/UI/Button";
import { MetaMask } from "src/components/UI/Icons";
import { MetaMaskWalletContext } from "src/context/MetaMaskWalletContext";

export default function ConnectToWallet() {
  // TODO: better context typing
  const { connect } = useContext<any>(MetaMaskWalletContext);
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <main className="container flex h-80 w-72 flex-col items-center justify-between">
        <div className="space-y-2 text-center">
          <MetaMask className="mx-auto w-16" />
          <h2 className="text-lg">MetaMask</h2>
        </div>
        <PrimaryButton className="w-full" onClick={connect}>
          Connect
        </PrimaryButton>
      </main>
    </div>
  );
}
