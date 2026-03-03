import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders admin login welcome text", () => {
  render(<App />);
  const welcomeText = screen.getByText(/welcome, admin/i);
  expect(welcomeText).toBeInTheDocument();
});
