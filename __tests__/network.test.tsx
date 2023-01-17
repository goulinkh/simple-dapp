import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Network from "../src/components/Network";

describe("Network", () => {
  it("shows the name of the network", async () => {
    render(<Network name={"testnet"} />);
    const network = await screen.findByText("testnet");
    expect(network).toBeInTheDocument();
  });
});
