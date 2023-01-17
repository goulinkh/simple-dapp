import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Balance from "src/components/Balance";

describe("Balance", () => {
  it("shows the balance in ETH", async () => {
    render(<Balance value="3.14" />);
    const balance = await screen.findByText("3.14 ETH");
    expect(balance).toBeInTheDocument();
  });
});
