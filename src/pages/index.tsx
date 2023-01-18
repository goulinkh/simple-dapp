import { Transaction } from "@prisma/client";
import Link from "next/link";
import { useContext } from "react";
import Balance from "src/components/Balance";
import Header from "src/components/Header";
import Loading from "src/components/Loading";
import Transactions, {
  Transaction as UITransaction,
} from "src/components/Transactions";
import { PrimaryButton } from "src/components/UI/Button";
import {
  MetaMaskWalletContext,
  Wallet,
} from "src/context/MetaMaskWalletContext";
import { fetcher } from "src/utils";
import useSWR from "swr";

const txToUITransactionItem = (
  tx: Transaction,
  wallet: Wallet
): UITransaction => {
  const txType =
    wallet.address.toLowerCase() === tx.from.toLowerCase()
      ? "sent"
      : "received";
  const targetAddress = txType === "sent" ? tx.to : tx.from;
  return {
    amount: tx.value,
    type: txType,
    targetAddress,
    timestamp: new Date(tx.createdAt).getTime(),
  };
};

export default function Home() {
  const { wallet } = useContext<any>(MetaMaskWalletContext);
  // TODO: show the errors if exist
  const { data, error, isLoading } = useSWR<Transaction[]>(() => {
    if (wallet) {
      return `/api/transactions?address=${wallet.address}`;
    }
  }, fetcher);
  return (
    <>
      <Header
        address={wallet?.address || "loading"}
        network={wallet?.network}
      />
      <main className="container space-y-10">
        <div className="flex items-center justify-between">
          <Balance value={wallet?.balance} />
          <Link href="/send">
            <PrimaryButton className="px-8">Send</PrimaryButton>
          </Link>
        </div>
        {(isLoading || !data) && <Loading />}
        {data && (
          <Transactions
            transactions={data?.map((tx) => txToUITransactionItem(tx, wallet))}
          />
        )}
      </main>
    </>
  );
}
