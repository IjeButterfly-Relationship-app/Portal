import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Analytics from "../pages/Analytics";

describe("Analytics Component", () => {
  // ──────────────────────────────────────
  // Rendering Tests
  // ──────────────────────────────────────

  test("renders the component without crashing", () => {
    render(<Analytics />);
    expect(screen.getByText("Analytics & Growth")).toBeInTheDocument();
  });

  test("renders the header with title and subtitle", () => {
    render(<Analytics />);
    expect(screen.getByText("Analytics & Growth")).toBeInTheDocument();
    expect(
      screen.getByText(/Comprehensive insights into conversion funnels/i),
    ).toBeInTheDocument();
  });

  test("renders all three metric cards", () => {
    render(<Analytics />);
    expect(screen.getByText("Platform Health Score")).toBeInTheDocument();
    expect(screen.getByText("Matching Success Rate")).toBeInTheDocument();
    expect(screen.getByText("Active Subscriptions")).toBeInTheDocument();
  });

  test("renders metric values correctly", () => {
    render(<Analytics />);
    expect(screen.getByText("15.4%")).toBeInTheDocument();
    expect(screen.getByText("8.2 / 10")).toBeInTheDocument();
    expect(screen.getByText("1,248")).toBeInTheDocument();
  });

  test("renders all chart sections", () => {
    render(<Analytics />);
    expect(
      screen.getByText("Subscription Conversion Funnel"),
    ).toBeInTheDocument();
    expect(screen.getByText("Matching Quality")).toBeInTheDocument();
    expect(
      screen.getByText("Cohort Retention Analysis (6 Months)"),
    ).toBeInTheDocument();
  });

  test("renders funnel stages correctly", () => {
    render(<Analytics />);
    expect(screen.getByText("Awareness")).toBeInTheDocument();
    expect(screen.getByText("Interest")).toBeInTheDocument();
    expect(screen.getByText("Consideration")).toBeInTheDocument();
    expect(screen.getByText("Conversion")).toBeInTheDocument();
  });

  test("renders matching quality legend items", () => {
    render(<Analytics />);
    expect(screen.getByText("Highly Successful")).toBeInTheDocument();
    expect(screen.getByText("Successful")).toBeInTheDocument();
    expect(screen.getByText("Needs Review")).toBeInTheDocument();
    expect(screen.getByText("Not Successful")).toBeInTheDocument();
  });

  test("renders cohort retention table with all rows", () => {
    render(<Analytics />);
    expect(screen.getByText("Jan 2023")).toBeInTheDocument();
    expect(screen.getByText("Jun 2023")).toBeInTheDocument();
  });

  test("renders table headers correctly", () => {
    render(<Analytics />);
    expect(screen.getByText("Cohort Month")).toBeInTheDocument();
    expect(screen.getByText("Month 0")).toBeInTheDocument();
    expect(screen.getByText("Month 1")).toBeInTheDocument();
  });

  // ──────────────────────────────────────
  // Control Tests
  // ──────────────────────────────────────

  test("renders time range select", () => {
    render(<Analytics />);
    const selectElement = screen.getByDisplayValue("Last 12 Months");
    expect(selectElement).toBeInTheDocument();
  });

  test("time range select has all options", () => {
    render(<Analytics />);
    const selectElement = screen.getByDisplayValue("Last 12 Months");
    expect(selectElement.querySelectorAll("option")).toHaveLength(5);
  });

  test("allows changing time range", async () => {
    render(<Analytics />);
    const selectElement = screen.getByDisplayValue("Last 12 Months");

    await userEvent.selectOptions(selectElement, "7days");
    expect(selectElement).toHaveValue("7days");
  });

  test("renders all control buttons", () => {
    render(<Analytics />);
    expect(screen.getByText("Today")).toBeInTheDocument();
    expect(screen.getByText("Previous Body")).toBeInTheDocument();
    expect(screen.getByText("Share Analysis")).toBeInTheDocument();
  });

  test("button click changes active state", async () => {
    render(<Analytics />);
    const todayBtn = screen.getByText("Today");

    fireEvent.click(todayBtn);
    expect(todayBtn).toHaveClass("active");
  });

  test("export and details buttons are rendered in cohort section", () => {
    render(<Analytics />);
    expect(screen.getByText("Export")).toBeInTheDocument();
    expect(screen.getByText("Details")).toBeInTheDocument();
  });

  // ──────────────────────────────────────
  // Data Tests
  // ──────────────────────────────────────

  test("metric cards display correct descriptions", () => {
    render(<Analytics />);
    expect(
      screen.getByText("Overall platform performance score"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("User satisfaction with matches"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Currently active memberships"),
    ).toBeInTheDocument();
  });

  test("metric badges display correct values", () => {
    render(<Analytics />);
    expect(screen.getByText("+2.5%")).toBeInTheDocument();
    expect(screen.getByText("↑ 6.2")).toBeInTheDocument();
    expect(screen.getByText("+215 est")).toBeInTheDocument();
  });

  test("funnel data percentages are displayed correctly", () => {
    render(<Analytics />);
    expect(screen.getByText("100.0%")).toBeInTheDocument();
    expect(screen.getByText("84.4%")).toBeInTheDocument();
    expect(screen.getByText("54.6%")).toBeInTheDocument();
    expect(screen.getByText("27.9%")).toBeInTheDocument();
  });

  test("legend displays percentages for quality metrics", () => {
    render(<Analytics />);
    const legendPercentages = screen.getAllByText(/\d+%/);
    expect(legendPercentages.length).toBeGreaterThan(0);
  });

  test("cohort retention values are displayed correctly", () => {
    render(<Analytics />);
    expect(screen.getByText("100%")).toBeInTheDocument();
    expect(screen.getByText("78%")).toBeInTheDocument();
    expect(screen.getByText("65%")).toBeInTheDocument();
  });

  // ──────────────────────────────────────
  // Chart Tests
  // ──────────────────────────────────────

  test("pie chart renders without errors", () => {
    render(<Analytics />);
    const pieChart = screen
      .getByText("Matching Quality")
      .closest(".ag-chart-container");
    expect(pieChart).toBeInTheDocument();
  });

  test("funnel chart renders all bars", () => {
    render(<Analytics />);
    const funnelCharts = screen.getAllByText(/100\.0%|84\.4%|54\.6%|27\.9%/);
    expect(funnelCharts.length).toBeGreaterThan(0);
  });

  test("retention table has correct number of rows", () => {
    render(<Analytics />);
    const table = screen.getByText("Cohort Month").closest("table");
    const rows = table.querySelectorAll("tbody tr");
    expect(rows).toHaveLength(6); // 6 cohort months
  });

  // ──────────────────────────────────────
  // Accessibility Tests
  // ──────────────────────────────────────

  test("all sections have proper headings", () => {
    render(<Analytics />);
    expect(
      screen.getByRole("heading", { name: /Analytics & Growth/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Subscription Conversion Funnel/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Matching Quality/i }),
    ).toBeInTheDocument();
  });

  test("select element has proper label", () => {
    render(<Analytics />);
    expect(screen.getByLabelText("Last 12 Months")).toBeInTheDocument();
  });

  test("buttons are keyboard accessible", () => {
    render(<Analytics />);
    const todayBtn = screen.getByText("Today");
    expect(todayBtn).toHaveProperty("type", "button");
  });

  test("table has proper structure", () => {
    render(<Analytics />);
    const table = screen.getByText("Cohort Month").closest("table");
    expect(table.querySelector("thead")).toBeInTheDocument();
    expect(table.querySelector("tbody")).toBeInTheDocument();
  });

  // ──────────────────────────────────────
  // Footer Tests
  // ──────────────────────────────────────

  test("footer is rendered", () => {
    render(<Analytics />);
    expect(screen.getByText(/© 2024 Analytics Suite/)).toBeInTheDocument();
  });

  test("footer contains navigation links", () => {
    render(<Analytics />);
    expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
    expect(screen.getByText("Terms of Service")).toBeInTheDocument();
    expect(screen.getByText("Support Center")).toBeInTheDocument();
  });

  // ──────────────────────────────────────
  // Integration Tests
  // ──────────────────────────────────────

  test("changing time range doesn't break the component", async () => {
    render(<Analytics />);
    const selectElement = screen.getByDisplayValue("Last 12 Months");

    await userEvent.selectOptions(selectElement, "30days");

    // All elements should still be present
    expect(screen.getByText("Analytics & Growth")).toBeInTheDocument();
    expect(screen.getByText("Platform Health Score")).toBeInTheDocument();
  });

  test("clicking multiple buttons doesn't break the component", async () => {
    render(<Analytics />);

    const todayBtn = screen.getByText("Today");
    const previousBtn = screen.getByText("Previous Body");

    fireEvent.click(todayBtn);
    fireEvent.click(previousBtn);
    fireEvent.click(todayBtn);

    expect(screen.getByText("Analytics & Growth")).toBeInTheDocument();
  });

  test("all metrics data is displayed and accurate", () => {
    render(<Analytics />);

    const healthScore = screen.getByText("Platform Health Score");
    const matchingRate = screen.getByText("Matching Success Rate");
    const subscriptions = screen.getByText("Active Subscriptions");

    expect(healthScore).toBeInTheDocument();
    expect(matchingRate).toBeInTheDocument();
    expect(subscriptions).toBeInTheDocument();
  });

  test("cohort table displays all months and retention data", () => {
    render(<Analytics />);

    const allCohorts = [
      "Jan 2023",
      "Feb 2023",
      "Mar 2023",
      "Apr 2023",
      "May 2023",
      "Jun 2023",
    ];

    allCohorts.forEach((cohort) => {
      expect(screen.getByText(cohort)).toBeInTheDocument();
    });
  });

  test("rendering doesn't produce console errors", () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    render(<Analytics />);

    expect(consoleSpy).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  // ──────────────────────────────────────
  // Visual Tests
  // ──────────────────────────────────────

  test("metric cards have proper styling classes", () => {
    render(<Analytics />);
    const cards = screen.getAllByRole("heading", { level: 3 });
    cards.forEach((card) => {
      const parentCard = card.closest(".ag-metric-card");
      expect(parentCard).toBeInTheDocument();
    });
  });

  test("chart containers have proper classes", () => {
    render(<Analytics />);
    const containers = document.querySelectorAll(".ag-chart-container");
    expect(containers.length).toBeGreaterThan(0);
  });

  test("retention table has color-coded cells", () => {
    render(<Analytics />);
    const table = screen.getByText("Cohort Month").closest("table");
    const cells = table.querySelectorAll('td[style*="backgroundColor"]');
    expect(cells.length).toBeGreaterThan(0);
  });
});
