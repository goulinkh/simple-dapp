import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import Balance from "src/components/Balance";
import Header from "src/components/Header";
import { PrimaryButton, SecondaryButton } from "src/components/UI/Button";
import { LeftArrow } from "src/components/UI/Icons";
import TextInput from "src/components/UI/TextInput";
import { MetaMaskWalletContext } from "src/context/MetaMaskWalletContext";

export default function SendTransaction() {
  const { wallet } = useContext<any>(MetaMaskWalletContext);

  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState<number>(0);

  const [formInputsValid, setFormInputsValid] = useState(false);

  useEffect(() => {
    setFormInputsValid(Boolean(destination) && amount != 0 && !isNaN(amount));
  }, [destination, amount]);

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
        <form className="space-y-6">
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
            value={amount === 0 ? undefined : amount}
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
