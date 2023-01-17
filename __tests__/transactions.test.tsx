import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Transaction, TransactionItem } from "src/components/Transactions";

const transactionsTestingData: Transaction[] = [
  {
    amount: "1.23",
    targetAddress: "0x1B7aA44088a0eA95bdc65fef6E5071E946Bf7d8f",
    timestamp: new Date().getTime() - 1000 * 60 * 60 * 2,
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
];

describe("TransactionItem", () => {
  it("shows the received amount from the transaction", async () => {
    render(<TransactionItem {...transactionsTestingData[0]} />);
    const amount = await screen.findByText("+1.23 ETH");
    expect(amount).toBeInTheDocument();
  });

  it("shows the sent amount from the transaction", async () => {
    render(<TransactionItem {...transactionsTestingData[1]} />);
    const amount = await screen.findByText("-0.133 ETH");
    expect(amount).toBeInTheDocument();
  });

  it("shows the address from the transaction", async () => {
    render(<TransactionItem {...transactionsTestingData[0]} />);
    const address = await screen.findByText(
      "0x1B7aA44088a0eA95bdc65fef6E5071E946Bf7d8f"
    );
    expect(address).toBeInTheDocument();
  });

  it("shows the date from now based on the timestamp in the transaction", async () => {
    render(<TransactionItem {...transactionsTestingData[0]} />);
    const time = await screen.findByText(/2 hours ago/i);
    expect(time).toBeInTheDocument();
  });
});
