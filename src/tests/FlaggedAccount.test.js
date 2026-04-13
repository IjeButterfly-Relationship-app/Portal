import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FlaggedAccount from "../pages/FlaggedAccount";

// ─── Render helper ────────────────────────────────────────────────────────────
function setup() {
  return render(
    <MemoryRouter>
      <FlaggedAccount />
    </MemoryRouter>,
  );
}

describe("FlaggedAccount Component", () => {
  it("renders without crashing", () => {
    setup();
    expect(
      screen.getByRole("heading", { name: /flagged account review/i }),
    ).toBeInTheDocument();
  });

  it("shows face mismatch flag", () => {
    setup();
    expect(screen.getByText(/face mismatch/i)).toBeInTheDocument();
  });

  it("shows IP geolocation mismatch flag", () => {
    setup();
    expect(screen.getByText(/IP Geolocation Mismatch/)).toBeInTheDocument();
  });

  it("shows device ID shared flag", () => {
    setup();
    expect(
      screen.getByText(/Device ID shared with 3 previously banned accounts/),
    ).toBeInTheDocument();
  });

  it("renders Previous Flags section", () => {
    setup();
    expect(screen.getByText(/Previous Flags/i)).toBeInTheDocument();
  });

  it("shows suspicious messaging rate flag entry", () => {
    setup();
    expect(screen.getByText(/suspicious messaging rate/i)).toBeInTheDocument();
  });

  it("shows ID Verified entry in previous flags", () => {
    setup();
    expect(
      screen.getByText(/ID Verified \(Primary Level\)/),
    ).toBeInTheDocument();
  });
});

// ─── Action Buttons ───────────────────────────────────────────────────────────
describe("Action buttons", () => {
  it("renders Approve Profile button", () => {
    setup();
    expect(
      screen.getByRole("button", { name: /approve profile/i }),
    ).toBeInTheDocument();
  });

  it("renders Reject Submission button", () => {
    setup();
    expect(
      screen.getByRole("button", { name: /reject submission/i }),
    ).toBeInTheDocument();
  });

  it("renders Flag for Review button", () => {
    setup();
    expect(
      screen.getByRole("button", { name: /flag for review/i }),
    ).toBeInTheDocument();
  });

  it("renders Escalate to Super Admin button", () => {
    setup();
    expect(
      screen.getByRole("button", { name: /escalate to super admin/i }),
    ).toBeInTheDocument();
  });
});

