import { render, screen, fireEvent } from "@testing-library/react";
import { AuthForm } from "@/components/auth/AuthForm";

const mockSignIn = jest.fn();
const mockSignUp = jest.fn();

jest.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    auth: {
      signInWithPassword: mockSignIn,
      signUp: mockSignUp,
    },
  }),
}));

beforeEach(() => {
  mockSignIn.mockReset().mockResolvedValue({ error: null });
  mockSignUp.mockReset().mockResolvedValue({ error: null });
});

/**
 * Fills the form fields and fires the submit event directly, bypassing
 * HTML5 constraint validation so our JavaScript validation is tested.
 */
function fillAndSubmit(
  emailValue: string,
  passwordValue: string,
  buttonLabel: RegExp = /sign in/i
) {
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  fireEvent.change(emailInput, { target: { value: emailValue } });
  fireEvent.change(passwordInput, { target: { value: passwordValue } });
  const form = emailInput.closest("form")!;
  fireEvent.submit(form);
}

describe("AuthForm – sign in validation", () => {
  it("shows error for invalid email (no @)", async () => {
    render(<AuthForm mode="signin" />);
    fillAndSubmit("notvalid", "password123");
    expect(await screen.findByText(/valid email/i)).toBeInTheDocument();
    expect(mockSignIn).not.toHaveBeenCalled();
  });

  it("shows error for password shorter than 6 chars", async () => {
    render(<AuthForm mode="signin" />);
    fillAndSubmit("test@example.com", "abc");
    expect(await screen.findByText(/at least 6 characters/i)).toBeInTheDocument();
    expect(mockSignIn).not.toHaveBeenCalled();
  });

  it("calls Supabase when inputs are valid", async () => {
    render(<AuthForm mode="signin" />);
    fillAndSubmit("test@example.com", "password123");
    await screen.findByRole("button");
    expect(mockSignIn).toHaveBeenCalled();
  });
});

describe("AuthForm – sign up validation", () => {
  it("shows error for invalid email on sign up", async () => {
    render(<AuthForm mode="signup" />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "bademail" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "password123" } });
    const form = screen.getByLabelText(/email/i).closest("form")!;
    fireEvent.submit(form);
    expect(await screen.findByText(/valid email/i)).toBeInTheDocument();
    expect(mockSignUp).not.toHaveBeenCalled();
  });
});
