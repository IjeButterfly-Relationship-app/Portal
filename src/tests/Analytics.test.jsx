import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Analytics from "../pages/Analytics";

describe("Analytics Component", () => {
  test("renders the component without crashing", () => {
    render(<Analytics />);
    expect(screen.getByText("Analytics & Growth")).toBeInTheDocument();
  });

  test("renders page title", () => {
    render(<Analytics />);
    expect(screen.getByText("Analytics & Growth")).toBeInTheDocument();
  });
});
