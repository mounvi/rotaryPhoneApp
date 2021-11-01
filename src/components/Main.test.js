import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";

it("renders the app elements correctly", () => {
  render(<App />);
  expect(screen.getByText(/Rotary Phone Letter Generator/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Enter your number/i)).toBeInTheDocument();
  expect(screen.getByText(/Generate Letter Codes/i)).toBeInTheDocument();
});

it("should fire input keypress event callback", () => {
  render(<App />);
  const input = screen.getByTestId("input");
  fireEvent.keyPress(input, { key: "9", code: "Digit9", charCode: 57 });
  fireEvent.keyPress(input, { key: "A", code: "KeyA", charCode: 65 });
});

it("should do nothing if button is pressed with blank input value", () => {
  render(<App />);
  const btn = screen.getByTestId("button");
  btn.click();
  expect(screen.queryByText(/Result /i)).toBeNull();
});

it("should generate codes on click of button", () => {
  render(<App />);
  const input = screen.getByTestId("input");
  const btn = screen.getByTestId("button");
  fireEvent.change(input, { target: { value: "123" } });
  expect(input).toHaveValue("123");
  btn.click();
  expect(screen.getByText(/Result /i)).toBeInTheDocument();
});
