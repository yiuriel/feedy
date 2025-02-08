import { render, screen } from "@testing-library/react";
import { StatsCard } from "./StatsCard";

describe("StatsCard", () => {
  it("renders the title and value", () => {
    render(<StatsCard title="Test Title" value={42} />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("shows loading state when isLoading is true", () => {
    render(<StatsCard title="Test Title" value={42} isLoading />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("...")).toBeInTheDocument();
    expect(screen.queryByText("42")).not.toBeInTheDocument();
  });
});
