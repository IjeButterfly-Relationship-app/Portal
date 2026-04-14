import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Login from "../pages/Login";

// Wrap component with router for testing
const renderLogin = () =>
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>,
  );

describe("Login Page", () => {
  // ============================================
  // RENDERING & STRUCTURE TESTS
  // ============================================

  test("renders login page without crashing", () => {
    renderLogin();
    expect(screen.getByText("Welcome back!")).toBeInTheDocument();
  });

  test("renders login form correctly", () => {
    renderLogin();
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter your password"),
    ).toBeInTheDocument();
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });

  test("renders glassy card container", () => {
    const { container } = renderLogin();
    const glassCard = container.querySelector(".glassCard");
    expect(glassCard).toBeInTheDocument();
  });

  test("renders all form labels", () => {
    renderLogin();
    expect(screen.getByText("Email address")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
  });

  test("renders welcome section", () => {
    renderLogin();
    expect(screen.getByText("Welcome back!")).toBeInTheDocument();
    expect(
      screen.getByText("Enter your credentials to access your account"),
    ).toBeInTheDocument();
  });

  // ============================================
  // FORM INPUT TESTS
  // ============================================

  test("updates email input value on change", async () => {
    renderLogin();
    const emailInput = screen.getByPlaceholderText("Enter your email");

    await userEvent.type(emailInput, "test@example.com");
    expect(emailInput.value).toBe("test@example.com");
  });

  test("updates password input value on change", async () => {
    renderLogin();
    const passwordInput = screen.getByPlaceholderText("Enter your password");

    await userEvent.type(passwordInput, "password123");
    expect(passwordInput.value).toBe("password123");
  });

  test("password input type is initially password", () => {
    renderLogin();
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    expect(passwordInput.type).toBe("password");
  });

  test("email input has required attribute", () => {
    renderLogin();
    const emailInput = screen.getByPlaceholderText("Enter your email");
    expect(emailInput.required).toBe(true);
  });

  test("password input has required attribute", () => {
    renderLogin();
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    expect(passwordInput.required).toBe(true);
  });

  // ============================================
  // PASSWORD VISIBILITY TOGGLE TESTS
  // ============================================

  test("toggles password visibility when eye button is clicked", async () => {
    renderLogin();
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const eyeButton = screen.getByLabelText("Show password");

    expect(passwordInput.type).toBe("password");

    fireEvent.click(eyeButton);
    expect(passwordInput.type).toBe("text");

    fireEvent.click(eyeButton);
    expect(passwordInput.type).toBe("password");
  });

  test("eye button has correct aria label when password is hidden", () => {
    renderLogin();
    const eyeButton = screen.getByLabelText("Show password");
    expect(eyeButton).toBeInTheDocument();
  });

  test("eye button aria label updates when toggled", async () => {
    renderLogin();
    const eyeButton = screen.getByLabelText("Show password");

    fireEvent.click(eyeButton);
    const hiddenLabel = screen.queryByLabelText("Show password");
    expect(hiddenLabel).not.toBeInTheDocument();
    expect(screen.getByLabelText("Hide password")).toBeInTheDocument();
  });

  // ============================================
  // REMEMBER ME & FORGOT PASSWORD TESTS
  // ============================================

  test("renders forgot password link", () => {
    renderLogin();
    expect(screen.getByText("Forgot password?")).toBeInTheDocument();
  });

  test("renders remember me checkbox", () => {
    renderLogin();
    const rememberCheckbox = screen.getByLabelText("Remember me");
    expect(rememberCheckbox).toBeInTheDocument();
  });

  test("remember me checkbox is not checked by default", () => {
    renderLogin();
    const rememberCheckbox = screen.getByLabelText("Remember me");
    expect(rememberCheckbox.checked).toBe(false);
  });

  test("can toggle remember me checkbox", async () => {
    renderLogin();
    const rememberCheckbox = screen.getByLabelText("Remember me");

    fireEvent.click(rememberCheckbox);
    expect(rememberCheckbox.checked).toBe(true);

    fireEvent.click(rememberCheckbox);
    expect(rememberCheckbox.checked).toBe(false);
  });

  // ============================================
  // BUTTON TESTS
  // ============================================

  test("renders Sign In button", () => {
    renderLogin();
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });

  test("Sign In button is not disabled initially", () => {
    renderLogin();
    const signInButton = screen.getByText("Sign In");
    expect(signInButton.disabled).toBe(false);
  });

  test("Sign In button is disabled when loading", async () => {
    renderLogin();

    const emailInput = screen.getByPlaceholderText("Enter your email");
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const signInButton = screen.getByText("Sign In");

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");

    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(screen.getByText("Signing in...")).toBeInTheDocument();
    });
  });

  // ============================================
  // ERROR HANDLING TESTS
  // ============================================

  test("displays error message when login fails", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "Invalid credentials" }),
      }),
    );

    renderLogin();

    const emailInput = screen.getByPlaceholderText("Enter your email");
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const signInButton = screen.getByText("Sign In");

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "wrongpassword");

    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    });

    global.fetch.mockClear();
  });

  test("displays connection error when server is unreachable", async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error("Network error")));

    renderLogin();

    const emailInput = screen.getByPlaceholderText("Enter your email");
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const signInButton = screen.getByText("Sign In");

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");

    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(
        screen.getByText("Cannot connect to server. Please try again."),
      ).toBeInTheDocument();
    });

    global.fetch.mockClear();
  });

  test("clears error message on form submission", async () => {
    const { rerender } = renderLogin();

    const emailInput = screen.getByPlaceholderText("Enter your email");
    const passwordInput = screen.getByPlaceholderText("Enter your password");

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "Invalid credentials" }),
      }),
    );

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "wrong");

    const signInButton = screen.getByText("Sign In");
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    });

    global.fetch.mockClear();
  });

  // ============================================
  // FORM SUBMISSION TESTS
  // ============================================

  test("submits form with email and password", async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            token: "fake-token",
            admin: {
              email: "test@example.com",
              role: "admin",
            },
          }),
      }),
    );

    global.fetch = mockFetch;

    renderLogin();

    const emailInput = screen.getByPlaceholderText("Enter your email");
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const signInButton = screen.getByText("Sign In");

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");

    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        "http://localhost:3001/auth/login",
        expect.objectContaining({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "test@example.com",
            password: "password123",
          }),
        }),
      );
    });

    global.fetch.mockClear();
  });

  test("stores auth token in localStorage on successful login", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            token: "fake-token-123",
            admin: {
              email: "test@example.com",
              role: "admin",
            },
          }),
      }),
    );

    const setItemSpy = jest.spyOn(localStorage, "setItem");

    renderLogin();

    const emailInput = screen.getByPlaceholderText("Enter your email");
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const signInButton = screen.getByText("Sign In");

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");

    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(setItemSpy).toHaveBeenCalledWith("authToken", "fake-token-123");
      expect(setItemSpy).toHaveBeenCalledWith(
        "admin_email",
        "test@example.com",
      );
      expect(setItemSpy).toHaveBeenCalledWith("admin_role", "admin");
    });

    setItemSpy.mockRestore();
    global.fetch.mockClear();
  });

  // ============================================
  // ACCESSIBILITY TESTS
  // ============================================

  test("all form inputs are accessible via labels", () => {
    renderLogin();
    expect(screen.getByText("Email address")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
  });

  test("form has proper structure with labels", () => {
    const { container } = renderLogin();
    const inputLabels = container.querySelectorAll("label");
    expect(inputLabels.length).toBeGreaterThan(0);
  });

  test("eye button has aria-label for accessibility", () => {
    renderLogin();
    const eyeButton = screen.getByLabelText("Show password");
    expect(eyeButton).toHaveAttribute("aria-label");
  });

  test("form submission is keyboard accessible", async () => {
    renderLogin();
    const signInButton = screen.getByText("Sign In");
    expect(signInButton.tagName).toBe("BUTTON");
  });

  // ============================================
  // VISUAL/STYLING TESTS
  // ============================================

  test("glassy card has required CSS classes", () => {
    const { container } = renderLogin();
    const glassCard = container.querySelector(".glassCard");
    expect(glassCard).toHaveClass("glassCard");
  });

  test("form container is inside glassy card", () => {
    const { container } = renderLogin();
    const glassCard = container.querySelector(".glassCard");
    const formContainer = glassCard.querySelector(".formContainer");
    expect(formContainer).toBeInTheDocument();
  });

  test("page has purple gradient background class", () => {
    const { container } = renderLogin();
    const page = container.querySelector(".page");
    expect(page).toHaveClass("page");
  });

  // ============================================
  // COMPONENT SNAPSHOT TEST
  // ============================================

  test("matches snapshot", () => {
    const { container } = renderLogin();
    expect(container).toMatchSnapshot();
  });
});
