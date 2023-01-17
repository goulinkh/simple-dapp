import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from "../src/components/Header";

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

describe("Header", () => {
  it("shows a disconnect button", async () => {
    render(<Header network={{ name: "testnet" }} address={"0xabcdefg"} />);
    const disconnect = await screen.findByText(/disconnect/i);
    expect(disconnect).toBeInTheDocument();
  });
});
