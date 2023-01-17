import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import Address from "../src/components/Address";

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

describe("Address", () => {
  it("shows the address", async () => {
    render(<Address address={"0xabcdefg"} />);
    const address = await screen.findByText("0xabcdefg");
    expect(address).toBeInTheDocument();
  });

  it("copy the address to clipboard on click", async () => {
    render(<Address address={"0xabcdefg"} />);
    const address = await screen.findByText("0xabcdefg");
    act(() => {
      address.click();
    });
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("0xabcdefg");
  });
});
