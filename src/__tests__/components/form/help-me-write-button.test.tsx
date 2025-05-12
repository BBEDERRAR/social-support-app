import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { HelpMeWriteButton } from "@/components/form/help-me-write-button";

// Mock the next-intl translation hook
jest.mock("next-intl", () => ({
  useTranslations: () => {
    return (key: string) => {
      const translations: Record<string, string> = {
        helpMeWrite: "Help me write",
      };
      return translations[key] || key;
    };
  },
}));

// Mock the spinner component
jest.mock("@/components/ui/spinner", () => ({
  Spinner: () => <div data-testid="spinner">Loading...</div>,
}));

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
  Sparkles: () => <div data-testid="sparkles-icon">✨</div>,
}));

describe("HelpMeWriteButton", () => {
  test("renders button with correct text", () => {
    const onClick = jest.fn();
    render(<HelpMeWriteButton onClick={onClick} />);

    const button = screen.getByRole("button", { name: /Help me write/i });
    expect(button).toBeInTheDocument();
  });

  test("calls onClick handler when clicked", () => {
    const onClick = jest.fn();
    render(<HelpMeWriteButton onClick={onClick} />);

    const button = screen.getByRole("button", { name: /Help me write/i });
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("shows spinner when loading", () => {
    const onClick = jest.fn();
    render(<HelpMeWriteButton onClick={onClick} isLoading={true} />);

    const spinner = screen.getByTestId("spinner");
    expect(spinner).toBeInTheDocument();

    // Check that the sparkles icon is not present when loading
    const sparkles = screen.queryByTestId("sparkles-icon");
    expect(sparkles).not.toBeInTheDocument();
  });

  test("shows sparkles icon when not loading", () => {
    const onClick = jest.fn();
    render(<HelpMeWriteButton onClick={onClick} isLoading={false} />);

    const sparkles = screen.getByTestId("sparkles-icon");
    expect(sparkles).toBeInTheDocument();

    // Check that the spinner is not present when not loading
    const spinner = screen.queryByTestId("spinner");
    expect(spinner).not.toBeInTheDocument();
  });

  test("button is disabled when loading", () => {
    const onClick = jest.fn();
    render(<HelpMeWriteButton onClick={onClick} isLoading={true} />);

    const button = screen.getByRole("button", { name: /Help me write/i });
    expect(button).toBeDisabled();

    // Clicking the disabled button should not trigger the onClick handler
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  test("button is enabled when not loading", () => {
    const onClick = jest.fn();
    render(<HelpMeWriteButton onClick={onClick} isLoading={false} />);

    const button = screen.getByRole("button", { name: /Help me write/i });
    expect(button).not.toBeDisabled();
  });
});
