import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../pages/Login/Login";
import * as authService from "../services/authService";

// Wrap component with router
const renderLogin = () =>
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>,
  );

describe("Login Page", () => {
  test("renders login form correctly", () => {
    renderLogin();
    expect(screen.getByPlaceholderText("Email Address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Sign In to Dashboard →")).toBeInTheDocument();
  });

  test("shows error on invalid credentials", async () => {
    jest.spyOn(authService, "loginAdmin").mockRejectedValue({
      response: { data: { message: "Invalid credentials" } },
    });

    renderLogin();

    fireEvent.change(screen.getByPlaceholderText("Email Address"), {
      target: { value: "wrong@email.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByText("Sign In to Dashboard →"));

    await waitFor(() => {
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    });
  });

  test("redirects on successful login", async () => {
    jest.spyOn(authService, "loginAdmin").mockResolvedValue({
      email: "admin@butterfly.com",
      role: "Super Admin",
    });

    renderLogin();

    fireEvent.change(screen.getByPlaceholderText("Email Address"), {
      target: { value: "admin@butterfly.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "correctpassword" },
    });
    fireEvent.click(screen.getByText("Sign In to Dashboard →"));

    await waitFor(() => {
      expect(sessionStorage.getItem("admin_logged_in")).toBe("true");
    });
  });
});
