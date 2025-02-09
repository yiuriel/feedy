import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./Input";

describe("Input", () => {
  it("renders correctly with basic props", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("displays label when provided", () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("hides label visually when hideLabel is true", () => {
    render(<Input label="Email" hideLabel />);
    const label = screen.getByText("Email");
    expect(label).toHaveClass("sr-only");
  });

  it("shows error message when error prop is provided", () => {
    const errorMessage = "This field is required";
    render(<Input error={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("applies aria-invalid when error is present", () => {
    render(<Input error="Error message" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("handles user input correctly", async () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    await userEvent.type(input, "test");

    expect(handleChange).toHaveBeenCalled();
    expect(input).toHaveValue("test");
  });

  it("applies custom className correctly", () => {
    render(<Input className="custom-class" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("custom-class");
  });

  it("passes through additional props", () => {
    render(<Input data-testid="test-input" maxLength={10} />);
    const input = screen.getByTestId("test-input");
    expect(input).toHaveAttribute("maxLength", "10");
  });
});
