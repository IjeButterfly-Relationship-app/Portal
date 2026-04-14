import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../pages/Login";

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
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter your password"),
    ).toBeInTheDocument();
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });

  test("renders forgot password link", () => {
    renderLogin();
    expect(screen.getByText("Forgot password?")).toBeInTheDocument();
  });

  test("renders welcome message", () => {
    renderLogin();
    expect(screen.getByText("Welcome back!")).toBeInTheDocument();
  });
});
