import { BigNumber, ethers, providers, Signer } from "ethers";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEventHandler, useContext, useEffect, useState } from "react";
import Balance from "src/components/Balance";
import Header from "src/components/Header";
import { PrimaryButton, SecondaryButton } from "src/components/UI/Button";
import { LeftArrow } from "src/components/UI/Icons";
import TextInput from "src/components/UI/TextInput";
import {
  MetaMaskWalletContext,
  Wallet,
} from "src/context/MetaMaskWalletContext";

const createAndSendTx = async (
  provider: providers.Web3Provider,
  signer: Signer,
  wallet: Wallet,
  destination: string,
  amount: string
) => {
  const txCount = await provider.send("eth_getTransactionCount", [
    wallet.address,
    "latest",
  ]);
  try {
    const tx = {
      from: wallet.address,
      to: destination,
      value: ethers.utils.parseEther(amount),
      nonce: txCount,
      gasLimit: ethers.utils.hexlify(100000),
      gasPrice: ethers.utils.hexlify(await provider.getGasPrice()),
    };
    return await signer.sendTransaction(tx);
  } catch (e: any) {
    // TODO: better error handling
    console.log(e.message);
  }
};

export default function SendTransaction() {
  const { wallet, signer, provider } = useContext<any>(MetaMaskWalletContext);
  const [destination, setDestination] = useState("");

  const [amount, setAmount] = useState<number>(0);

  const [formInputsValid, setFormInputsValid] = useState(false);

  const router = useRouter();
  console.log(String(amount));
  console.log(
    "ethers.utils.parseEther(String(amount))",

    ethers.utils.formatEther(BigNumber.from("0x2386f26fc10000"))
  );
  useEffect(() => {
    setFormInputsValid(Boolean(destination) && amount != 0 && !isNaN(amount));
  }, [destination, amount]);

  const sendTokens: FormEventHandler = async (e) => {
    e.preventDefault();
    const tx = await createAndSendTx(
      provider,
      signer,
      wallet,
      destination,
      amount.toString()
    );
    await fetch("/api/transactions", {
      method: "POST",
      body: JSON.stringify(tx),
      headers: { "Content-Type": "application/json" },
    });
    router.push("/");
  };

  return (
    <>
      <Header
        address={wallet?.address || "loading"}
        network={wallet?.network}
      />
      <main className="container space-y-10">
        <div className="flex justify-between">
          <Balance value={wallet?.balance} />
          <Link href="/">
            <SecondaryButton className="flex items-center gap-1 text-sm">
              <LeftArrow className="w-4" /> Go back
            </SecondaryButton>
          </Link>
        </div>
        <form className="space-y-6" onSubmit={sendTokens}>
          <TextInput
            label="Destination"
            placeholder="Public address (0x)"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
            pattern="0x[a-fA-F0-9]{40}"
          />
          <TextInput
            label="Amount"
            placeholder="1.23456"
            type="number"
            min={0}
            step="any"
            // int (123) or float (1.3234)
            pattern="[0-9]+([\.][0-9]+)?"
            postfix={
              <div className="absolute right-8 top-0 flex h-full items-center justify-center">
                ETH
              </div>
            }
            value={amount}
            required
            onChange={(e) => setAmount(e.target.valueAsNumber)}
          />
          <PrimaryButton className={"w-full"} disabled={!formInputsValid}>
            Send
          </PrimaryButton>
        </form>
      </main>
    </>
  );
}
