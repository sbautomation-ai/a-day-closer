import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodayClient } from "@/app/app/today/TodayClient";

const mockPush = jest.fn();
const mockRefresh = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush, refresh: mockRefresh }),
}));

jest.mock("@/lib/actions/today", () => ({
  completeToday: jest.fn(),
}));

const completeToday = require("@/lib/actions/today").completeToday as jest.Mock;

const defaultProps = {
  userId: "user-1",
  readingDayId: "day-1",
  defaultJournal: "",
  defaultMood: null as number | null,
  alreadyCompleted: false,
};

describe("TodayClient", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    completeToday.mockResolvedValue({ ok: true });
  });

  it("shows Save & complete today when not completed", () => {
    render(<TodayClient {...defaultProps} />);
    expect(screen.getByRole("button", { name: /save & complete today/i })).toBeInTheDocument();
  });

  it("shows Update entry when already completed", () => {
    render(<TodayClient {...defaultProps} alreadyCompleted />);
    expect(screen.getByRole("button", { name: /update entry/i })).toBeInTheDocument();
  });

  it("calls completeToday on submit and shows success", async () => {
    const user = userEvent.setup();
    render(<TodayClient {...defaultProps} />);
    await user.click(screen.getByRole("button", { name: /save & complete today/i }));
    expect(completeToday).toHaveBeenCalledWith(
      "user-1",
      "day-1",
      "",
      null,
      null,
      null
    );
    expect(mockRefresh).toHaveBeenCalled();
    expect(screen.getByText(/saved\. day completed\./i)).toBeInTheDocument();
  });

  it("shows error when completeToday returns ok: false", async () => {
    completeToday.mockResolvedValue({ ok: false, error: "Reading not found." });
    const user = userEvent.setup();
    render(<TodayClient {...defaultProps} />);
    await user.click(screen.getByRole("button", { name: /save & complete today/i }));
    expect(screen.getByText("Reading not found.")).toBeInTheDocument();
  });
});
