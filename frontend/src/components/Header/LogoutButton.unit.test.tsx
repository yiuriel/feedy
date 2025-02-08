import { render, screen, fireEvent } from "@testing-library/react";
import { LogoutButton } from "./LogoutButton";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Mock the dependencies
jest.mock("react-router", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));

describe("LogoutButton", () => {
  const mockNavigate = jest.fn();
  const mockMutate = jest.fn();
  const mockClear = jest.fn();

  beforeEach(() => {
    // Setup mocks
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useMutation as jest.Mock).mockReturnValue({ mutate: mockMutate });
    (useQueryClient as jest.Mock).mockReturnValue({ clear: mockClear });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders logout button", () => {
    render(<LogoutButton />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("calls logout mutation when clicked", () => {
    render(<LogoutButton />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockMutate).toHaveBeenCalled();
  });
});
