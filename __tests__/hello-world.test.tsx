import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../src/pages/index";

describe("home page", () => {
  it("shows a hello world", async () => {
    render(<Home />);
    const message = await screen.findByText("Hello world");
    expect(message).toBeInTheDocument();
  });
});

export {};
