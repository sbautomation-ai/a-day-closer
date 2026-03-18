import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CopyVerseButton } from "@/components/today/CopyVerseButton";

/**
 * jsdom ships with a Clipboard stub that cannot be fully replaced via
 * Object.defineProperty. Instead of testing implementation (writeText calls)
 * we test observable behaviour: the "Copied" state appears after clicking,
 * which can only happen if navigator.clipboard.writeText resolved successfully.
 */

beforeEach(() => {
  Object.defineProperty(global.navigator, "share", {
    value: undefined,
    configurable: true,
    writable: true,
  });
});

describe("CopyVerseButton", () => {
  it("renders the copy button", () => {
    render(<CopyVerseButton reference="John 3:16" bibleText="For God so loved the world…" />);
    expect(screen.getByRole("button", { name: /copy verse/i })).toBeInTheDocument();
  });

  it("does not render Share button when navigator.share is unavailable", () => {
    render(<CopyVerseButton reference="John 3:16" bibleText="For God so loved the world…" />);
    expect(screen.queryByRole("button", { name: /^share$/i })).not.toBeInTheDocument();
  });

  it("shows Copied confirmation after clicking the copy button", async () => {
    const user = userEvent.setup();
    render(<CopyVerseButton reference="John 3:16" bibleText="For God so loved the world…" />);
    expect(screen.queryByText("Copied")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /copy verse/i }));
    expect(await screen.findByText("Copied")).toBeInTheDocument();
  });

  it("shows Share button when navigator.share is available", () => {
    Object.defineProperty(global.navigator, "share", {
      value: jest.fn().mockResolvedValue(undefined),
      configurable: true,
      writable: true,
    });
    render(<CopyVerseButton reference="John 3:16" bibleText="For God so loved the world…" />);
    expect(screen.getByRole("button", { name: /share verse/i })).toBeInTheDocument();
  });

  it("shows Shared confirmation after clicking Share", async () => {
    Object.defineProperty(global.navigator, "share", {
      value: jest.fn().mockResolvedValue(undefined),
      configurable: true,
      writable: true,
    });
    const user = userEvent.setup();
    render(<CopyVerseButton reference="John 3:16" bibleText="For God so loved the world…" />);
    await user.click(screen.getByRole("button", { name: /share verse/i }));
    expect(await screen.findByText("Shared")).toBeInTheDocument();
  });
});
