import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "./App";

// The create-react-app configured Jest in watch mode by default.

// - React Testing Library's
//      - render(): one of its APIs used to render the component we wish to test.
//      - screen:: an object containing numerous methods for finding elements on a page.
//      - getByRole(): one of its query methods for finding elements on a page.
//      - userEvent.click(): one of its methods for simulating users' interaction with an app
//  - jest-dom's custom matchers: 
//      - toHaveTextContent(): to confirm the presence of a text content in a specific node.

// WARNING: suppose you have numerous test cases for a component. In that case, use Jest's beforeEach() method to run render(<App />) before each test in your file (or describe block).
describe("App component", () => {
  test("codesweetly test heading", () => {
    render(<App />);
    expect(screen.getByRole("heading")).toHaveTextContent(/codesweetly test/i);
  });

  test("a codesweetly project heading", () => {
    render(<App />);

    const button = screen.getByRole("button", { name: "Update Heading" });

    userEvent.click(button);

    expect(screen.getByRole("heading")).toHaveTextContent(/a codesweetly project/i);
  });
});