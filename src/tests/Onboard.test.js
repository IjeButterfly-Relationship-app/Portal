import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OnboardAdmin from "../pages/Onboard";

// ── Helper ────────────────────────────────────────────────────────────────────
const setup = () => render(<OnboardAdmin />);

// =============================================================================
// Navbar
// =============================================================================
describe("Navbar", () => {
  test("renders logo mark", () => {
    setup();
    expect(document.querySelector(".logo-mark")).toBeInTheDocument();
  });

  test("renders search input with correct placeholder", () => {
    setup();
    expect(
      screen.getByPlaceholderText("Search dashboard…"),
    ).toBeInTheDocument();
  });

  test("renders notifications icon button", () => {
    setup();
    expect(screen.getByLabelText("Notifications")).toBeInTheDocument();
  });

  test("renders settings icon button", () => {
    setup();
    expect(screen.getByLabelText("Settings")).toBeInTheDocument();
  });

  test("renders Super Admin avatar with initials", () => {
    setup();
    expect(screen.getByText("SA")).toBeInTheDocument();
    expect(screen.getByText("Super Admin")).toBeInTheDocument();
  });
});

// =============================================================================
// Page Header
// =============================================================================
describe("Page Header", () => {
  test("renders page title", () => {
    setup();
    expect(
      screen.getByRole("heading", { name: "Onboard New Admin" }),
    ).toBeInTheDocument();
  });

  test("renders page subtitle", () => {
    setup();
    expect(
      screen.getByText(
        "Create account, assign role and set granular permissions.",
      ),
    ).toBeInTheDocument();
  });

  test("renders Cancel button", () => {
    setup();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });

  test("renders Create Admin Account button", () => {
    setup();
    expect(
      screen.getByRole("button", { name: "Create Admin Account" }),
    ).toBeInTheDocument();
  });
});

// =============================================================================
// Personal Information Section
// =============================================================================
describe("Personal Information", () => {
  test("renders section heading", () => {
    setup();
    expect(
      screen.getByRole("heading", { name: "Personal Information" }),
    ).toBeInTheDocument();
  });

  test("renders First Name field", () => {
    setup();
    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
  });

  test("renders Last Name field", () => {
    setup();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
  });

  test("renders Email Address field", () => {
    setup();
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
  });

  test("renders Phone Number field", () => {
    setup();
    expect(screen.getByLabelText("Phone Number")).toBeInTheDocument();
  });

  test("renders City / Region field", () => {
    setup();
    expect(screen.getByLabelText("City / Region")).toBeInTheDocument();
  });

  test("renders Country dropdown with default Uganda", () => {
    setup();
    const country = screen.getByLabelText("Country");
    expect(country).toBeInTheDocument();
    expect(country).toHaveValue("Uganda");
  });

  test("user can type into First Name field", async () => {
    setup();
    const input = screen.getByLabelText("First Name");
    await userEvent.clear(input);
    await userEvent.type(input, "Sarah");
    expect(input).toHaveValue("Sarah");
  });

  test("user can type into Email Address field", async () => {
    setup();
    const input = screen.getByLabelText("Email Address");
    await userEvent.clear(input);
    await userEvent.type(input, "test@admincore.io");
    expect(input).toHaveValue("test@admincore.io");
  });

  test("user can change Country dropdown", async () => {
    setup();
    const select = screen.getByLabelText("Country");
    await userEvent.selectOptions(select, "Kenya");
    expect(select).toHaveValue("Kenya");
  });
});

// =============================================================================
// Role & Department Section
// =============================================================================
describe("Role & Department", () => {
  test("renders section heading", () => {
    setup();
    expect(
      screen.getByRole("heading", { name: "Role & Department" }),
    ).toBeInTheDocument();
  });

  test("renders Admin Role dropdown with default value", () => {
    setup();
    expect(screen.getByLabelText("Admin Role")).toHaveValue("Concierge Admin");
  });

  test("renders Job Title input with default value", () => {
    setup();
    expect(screen.getByLabelText("Job Title")).toHaveValue("Head Concierge");
  });

  test("renders Reporting To dropdown", () => {
    setup();
    expect(screen.getByLabelText("Reporting To")).toBeInTheDocument();
    expect(screen.getByLabelText("Reporting To")).toHaveValue(
      "Super User (Alex Kirabo)",
    );
  });

  test("renders Access Level radio group", () => {
    setup();
    expect(
      screen.getByRole("radiogroup", { name: "Access Level" }),
    ).toBeInTheDocument();
  });

  test("renders all three access-level options", () => {
    setup();
    expect(screen.getByLabelText("standard Access")).toBeInTheDocument();
    expect(screen.getByLabelText("elevated Access")).toBeInTheDocument();
    expect(screen.getByLabelText("full Access")).toBeInTheDocument();
  });

  test("standard Access is selected by default", () => {
    setup();
    expect(screen.getByLabelText("standard Access")).toBeChecked();
  });

  test("clicking elevated Access selects it", () => {
    setup();
    fireEvent.click(screen.getByLabelText("elevated Access"));
    expect(screen.getByLabelText("elevated Access")).toBeChecked();
    expect(screen.getByLabelText("standard Access")).not.toBeChecked();
  });

  test("user can change Admin Role dropdown", async () => {
    setup();
    const select = screen.getByLabelText("Admin Role");
    await userEvent.selectOptions(select, "Super Admin");
    expect(select).toHaveValue("Super Admin");
  });
});

// =============================================================================
// Account Security Section
// =============================================================================
describe("Account Security", () => {
  test("renders section heading", () => {
    setup();
    expect(
      screen.getByRole("heading", { name: "Account Security" }),
    ).toBeInTheDocument();
  });

  test("renders Temporary Password field (type=password)", () => {
    setup();
    const input = screen.getByLabelText("Temporary Password");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "password");
  });

  test("renders Confirm Password field (type=password)", () => {
    setup();
    const input = screen.getByLabelText("Confirm Password");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "password");
  });

  test("renders informational note about 2FA", () => {
    setup();
    expect(
      screen.getByText(
        /Admin will be required to change password on first login/i,
      ),
    ).toBeInTheDocument();
  });
});

// =============================================================================
// Module Permissions Section
// =============================================================================
describe("Module Permissions", () => {
  test("renders section heading", () => {
    setup();
    expect(
      screen.getByRole("heading", { name: "Module Permissions" }),
    ).toBeInTheDocument();
  });

  test("renders CONTROL ACCESS badge", () => {
    setup();
    expect(screen.getByText("CONTROL ACCESS")).toBeInTheDocument();
  });

  const modules = [
    "Concierge Module",
    "View Member Profiles",
    "Send Messages",
    "Manage Coaching",
    "Moderation Access",
    "Analytics Access",
    "Billing Access",
    "Security Access",
  ];

  modules.forEach((mod) => {
    test(`renders "${mod}" module`, () => {
      setup();
      expect(screen.getByText(mod)).toBeInTheDocument();
    });
  });

  test("Concierge Module toggle is ON by default", () => {
    setup();
    const toggle = screen.getByRole("switch", { name: /Concierge Module/i });
    // aria-checked reflects initial state
    expect(toggle).toHaveAttribute("aria-checked", "true");
  });

  test("Moderation Access toggle is OFF by default", () => {
    setup();
    const toggle = screen.getByRole("switch", { name: /Moderation Access/i });
    expect(toggle).toHaveAttribute("aria-checked", "false");
  });

  test("clicking Moderation Access toggle switches it ON", () => {
    setup();
    const toggle = screen.getByRole("switch", { name: /Moderation Access/i });
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-checked", "true");
  });

  test("clicking an active toggle switches it OFF", () => {
    setup();
    const toggle = screen.getByRole("switch", { name: /Concierge Module/i });
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-checked", "false");
  });
});

// =============================================================================
// Send Welcome Email Section
// =============================================================================
describe("Send Welcome Email", () => {
  test("renders section heading", () => {
    setup();
    expect(
      screen.getByRole("heading", { name: "Send Welcome Email" }),
    ).toBeInTheDocument();
  });

  test("renders Send login credentials toggle ON by default", () => {
    setup();
    const toggle = screen.getByRole("switch", {
      name: /Send login credentials/i,
    });
    expect(toggle).toHaveAttribute("aria-checked", "true");
  });

  test("renders Require 2FA setup toggle ON by default", () => {
    setup();
    const toggle = screen.getByRole("switch", { name: /Require 2FA setup/i });
    expect(toggle).toHaveAttribute("aria-checked", "true");
  });

  test("toggles Send login credentials off when clicked", () => {
    setup();
    const toggle = screen.getByRole("switch", {
      name: /Send login credentials/i,
    });
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-checked", "false");
  });
});

// =============================================================================
// Next Steps Section
// =============================================================================
describe("Next Steps", () => {
  test("renders Next Steps note", () => {
    setup();
    expect(
      screen.getByRole("note", { name: "Next Steps" }),
    ).toBeInTheDocument();
  });

  test("renders invitation link expiry message", () => {
    setup();
    expect(
      screen.getByText(/invitation link valid for 48 hours/i),
    ).toBeInTheDocument();
  });
});

describe("Footer", () => {
  test("renders copyright notice", () => {
    setup();
    expect(
      screen.getByText(/2024 AdminCore Wireframe System/i),
    ).toBeInTheDocument();
  });
});

describe("Form submission", () => {
  test("shows alert on Create Admin Account click", () => {
    setup();
    window.alert = jest.fn();
    fireEvent.submit(document.getElementById("onboard-form"));
    expect(window.alert).toHaveBeenCalledWith(
      "Admin account created successfully!",
    );
  });
});
