import { FC } from "react";
import moment from "moment";
import Address from "./Address";
import clsx from "clsx";

const timeFromNow = (date: number | Date) => {
  const now = new Date();
  const nowMoment = moment(now);
  const pastMoment = moment(date);
  const timeAgoString = pastMoment.from(nowMoment); // 2 hours ago
  return timeAgoString;
};

export type Transaction = {
  type: "received" | "sent";
  amount: string;
  timestamp: number;
  targetAddress: string;
};

export const TransactionItem: FC<Transaction> = ({
  type,
  amount,
  targetAddress,
  timestamp,
}) => {
  const addressPrefix = type === "received" ? "From" : "To";
  const amountPrefix = type === "received" ? "+" : "-";
  const amountText = `${amountPrefix}${amount} ETH`;
  return (
    <div className="flex justify-between rounded-lg border p-3">
      <div className="flex flex-col gap-2">
        <div className={clsx({ "text-green-600": type === "received" })}>
          {amountText}
        </div>
        <div className="text-xs text-black/70">
          {addressPrefix}: <Address address={targetAddress} />
        </div>
      </div>
      <div className="text-sm text-black/70">{timeFromNow(timestamp)}</div>
    </div>
  );
};

type Props = {
  transactions: Transaction[];
};

const Transactions: FC<Props> = ({ transactions }) => {
  transactions.sort((a, b) => b.timestamp - a.timestamp);
  return (
    <div className="space-y-4">
      <h2>
        Transactions{" "}
        <span className="rounded-full border border-black/10 bg-black/5 py-0.5 px-2">
          {transactions.length}
        </span>
      </h2>
      <div className="flex flex-col gap-2">
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.timestamp} {...transaction} />
        ))}
      </div>
    </div>
  );
};

export default Transactions;
