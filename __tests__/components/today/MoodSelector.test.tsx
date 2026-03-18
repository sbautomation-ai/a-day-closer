import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MoodSelector } from "@/components/today/MoodSelector";

describe("MoodSelector", () => {
  it("renders all mood options with labels", () => {
    render(<MoodSelector value={null} onChange={() => {}} />);
    expect(screen.getByRole("group", { name: /how are you today/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /struggling/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /great/i })).toBeInTheDocument();
  });

  it("calls onChange when a mood is clicked", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<MoodSelector value={null} onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: /good/i }));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it("toggles off when clicking selected mood", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<MoodSelector value={4} onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: /good/i }));
    expect(onChange).toHaveBeenCalledWith(null);
  });

  it("marks selected mood with aria-pressed", () => {
    render(<MoodSelector value={3} onChange={() => {}} />);
    const okay = screen.getByRole("button", { name: /okay/i });
    expect(okay).toHaveAttribute("aria-pressed", "true");
  });
});
