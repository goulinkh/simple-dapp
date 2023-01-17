import Link from "next/link";
import Balance from "src/components/Balance";
import Header from "src/components/Header";
import Transactions from "src/components/Transactions";
import { PrimaryButton } from "src/components/UI/Button";

export default function Home() {
  return (
    <>
      <Header address="test" network={{ name: "test" }} />
      <main className="container space-y-10">
        <div className="flex items-center justify-between">
          <Balance value="2.14" />
          <Link href="/send">
            <PrimaryButton className="px-8">Send</PrimaryButton>
          </Link>
        </div>
        <Transactions
          transactions={[
            {
              amount: "1.23",
              targetAddress: "0x1B7aA44088a0eA95bdc65fef6E5071E946Bf7d8f",
              timestamp: 1673983625208,
              type: "received",
            },
            {
              amount: "0.133",
              targetAddress: "0x1B7aA44088a0eA95bdc65fef6E5071E946Bf7d8f",
              timestamp: 1673988625208,
              type: "sent",
            },
            {
              amount: "5.1",
              targetAddress: "0x1B7aA44088a0eA95bdc65fef6E5071E946Bf7d8f",
              timestamp: 1673988925208,
              type: "received",
            },
          ]}
        />
      </main>
    </>
  );
}
