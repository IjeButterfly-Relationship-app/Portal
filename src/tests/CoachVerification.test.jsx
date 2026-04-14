import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ButterflyVerification from "./ButterflyVerification";

describe("ButterflyVerification Component", () => {
  // ============================================
  // RENDERING & INITIAL STATE TESTS
  // ============================================

  describe("Rendering", () => {
    it("should render without crashing", () => {
      const { container } = render(<ButterflyVerification />);
      expect(container).toBeInTheDocument();
    });

    it("should render the main container with correct class", () => {
      const { container } = render(<ButterflyVerification />);
      const mainContainer = container.querySelector(".butterfly-container");
      expect(mainContainer).toBeInTheDocument();
    });

    it("should display the Butterfly logo", () => {
      render(<ButterflyVerification />);
      expect(screen.getByText("Butterfly")).toBeInTheDocument();
    });

    it("should render all navigation items", () => {
      render(<ButterflyVerification />);
      expect(screen.getByText("Dashboard")).toBeInTheDocument();
      expect(screen.getByText("Coaches")).toBeInTheDocument();
      expect(screen.getByText("Verifications")).toBeInTheDocument();
      expect(screen.getByText("Moderation")).toBeInTheDocument();
      expect(screen.getByText("Activity Logs")).toBeInTheDocument();
      expect(screen.getByText("Settings")).toBeInTheDocument();
    });
  });

  // ============================================
  // HEADER & SEARCH TESTS
  // ============================================

  describe("Header & Search", () => {
    it("should display the search input with correct placeholder", () => {
      render(<ButterflyVerification />);
      const searchInput = screen.getByPlaceholderText(
        "Search coaches, documents, or IDs...",
      );
      expect(searchInput).toBeInTheDocument();
    });

    it("should display user profile section with name", () => {
      render(<ButterflyVerification />);
      expect(screen.getByText("Sarah Miller")).toBeInTheDocument();
    });

    it("should render notification bell icon", () => {
      const { container } = render(<ButterflyVerification />);
      const notificationBell = container.querySelector(".notification-bell");
      expect(notificationBell).toBeInTheDocument();
    });

    it("should handle search input changes", async () => {
      render(<ButterflyVerification />);
      const searchInput = screen.getByPlaceholderText(
        "Search coaches, documents, or IDs...",
      );

      await userEvent.type(searchInput, "Elena");
      expect(searchInput.value).toBe("Elena");
    });
  });

  // ============================================
  // COACHES LIST TESTS
  // ============================================

  describe("Coaches List", () => {
    it("should render all coaches in the queue", () => {
      render(<ButterflyVerification />);
      expect(screen.getByText("Dr. Elena Vance")).toBeInTheDocument();
      expect(screen.getByText("Marcus Thorne")).toBeInTheDocument();
      expect(screen.getByText("Sarah Jenkins")).toBeInTheDocument();
      expect(screen.getByText("Liam O'Connell")).toBeInTheDocument();
      expect(screen.getByText("Sofia Rodriguez")).toBeInTheDocument();
    });

    it('should display "Verification Queue" heading', () => {
      render(<ButterflyVerification />);
      expect(screen.getByText("Verification Queue")).toBeInTheDocument();
    });

    it("should show correct number of pending coaches", () => {
      render(<ButterflyVerification />);
      expect(screen.getByText("5 coaches awaiting review")).toBeInTheDocument();
    });

    it("should display coach statuses", () => {
      render(<ButterflyVerification />);
      expect(screen.getByText("Pending")).toBeInTheDocument();
      expect(screen.getByText("Reviewing")).toBeInTheDocument();
      expect(screen.getByText("Flagged")).toBeInTheDocument();
    });

    it("should select coach when clicked", async () => {
      const { container } = render(<ButterflyVerification />);
      const coachCards = container.querySelectorAll(".coach-card");

      // Click the second coach card (Marcus Thorne)
      fireEvent.click(coachCards[1]);

      // The second coach should be selected and have active class
      expect(coachCards[1]).toHaveClass("active");
    });

    it("should update detail panel when coach is selected", async () => {
      const { container } = render(<ButterflyVerification />);
      const coachCards = container.querySelectorAll(".coach-card");

      // Click on Sarah Jenkins
      fireEvent.click(coachCards[2]);

      // Wait for the details panel to update
      await waitFor(() => {
        expect(screen.getByText("Sarah Jenkins")).toBeInTheDocument();
      });
    });
  });

  // ============================================
  // COACH DETAILS TESTS
  // ============================================

  describe("Coach Details Panel", () => {
    it("should display selected coach information", () => {
      render(<ButterflyVerification />);
      expect(screen.getByText("Dr. Elena Vance")).toBeInTheDocument();
      expect(screen.getByText("@vance_coach")).toBeInTheDocument();
    });

    it("should display trust score", () => {
      render(<ButterflyVerification />);
      expect(screen.getByText("92%")).toBeInTheDocument();
    });

    it("should display trust ID", () => {
      render(<ButterflyVerification />);
      expect(screen.getByText("#V-29301")).toBeInTheDocument();
    });

    it("should render action buttons", () => {
      render(<ButterflyVerification />);
      expect(screen.getByText("Review Model Manual")).toBeInTheDocument();
      expect(screen.getByText("Reject")).toBeInTheDocument();
      expect(screen.getByText("Send rejection email")).toBeInTheDocument();
      expect(screen.getByText("Verify Coach")).toBeInTheDocument();
    });

    it("should display View Full Profile button", () => {
      render(<ButterflyVerification />);
      expect(screen.getByText("View Full Profile")).toBeInTheDocument();
    });

    it("should display Flag Account button", () => {
      render(<ButterflyVerification />);
      const flagButtons = screen.getAllByText("Flag Account");
      expect(flagButtons.length).toBeGreaterThan(0);
    });
  });

  // ============================================
  // DOCUMENT VIEWER TESTS
  // ============================================

  describe("Document Viewer", () => {
    it("should display document viewer section", () => {
      const { container } = render(<ButterflyVerification />);
      const docViewer = container.querySelector(".document-viewer");
      expect(docViewer).toBeInTheDocument();
    });

    it("should show page information", () => {
      render(<ButterflyVerification />);
      expect(screen.getByText(/Page 1 of 4/)).toBeInTheDocument();
    });

    it("should display document controls", () => {
      const { container } = render(<ButterflyVerification />);
      const docControls = container.querySelector(".doc-controls");
      const buttons = docControls.querySelectorAll("button");
      expect(buttons.length).toBe(4); // −, +, ↺, ↻
    });

    it("should display document navigation buttons", () => {
      render(<ButterflyVerification />);
      const prevButton = screen.getByText("← Previous");
      const nextButton = screen.getByText("Next Page →");
      expect(prevButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();
    });

    it("should display document filename", () => {
      render(<ButterflyVerification />);
      expect(
        screen.getByText(/Master_Degree_Clinical.pdf/),
      ).toBeInTheDocument();
    });
  });

  // ============================================
  // VERIFICATION CHECKLIST TESTS
  // ============================================

  describe("Verification Checklist", () => {
    it("should render verification checklist", () => {
      render(<ButterflyVerification />);
      expect(screen.getByText("VERIFICATION CHECKLIST")).toBeInTheDocument();
    });

    it("should display all checklist items", () => {
      render(<ButterflyVerification />);
      expect(screen.getByText("Full Name matches ID")).toBeInTheDocument();
      expect(
        screen.getByText("Degree Credential verified"),
      ).toBeInTheDocument();
      expect(
        screen.getByText("University seal clearly visible"),
      ).toBeInTheDocument();
      expect(screen.getByText("Profile photo matches ID")).toBeInTheDocument();
      expect(screen.getByText("ID is not expired")).toBeInTheDocument();
    });

    it("should display correct number of completed items", () => {
      const { container } = render(<ButterflyVerification />);
      const completedItems = container.querySelectorAll(
        ".checklist-item input[checked]",
      );
      expect(completedItems.length).toBe(3); // First 3 are completed
    });

    it("should show review progress", () => {
      render(<ButterflyVerification />);
      expect(screen.getByText("Review Progress")).toBeInTheDocument();
      expect(screen.getByText("CHECKLIST 80% COMPLETION")).toBeInTheDocument();
    });
  });

  // ============================================
  // DOCUMENT METADATA TESTS
  // ============================================

  describe("Document Metadata", () => {
    it("should display document metadata section", () => {
      render(<ButterflyVerification />);
      expect(screen.getByText("DOCUMENT METADATA")).toBeInTheDocument();
    });

    it("should display extracted full name", () => {
      render(<ButterflyVerification />);
      expect(screen.getByText("ELENA VICTORIA VANCE")).toBeInTheDocument();
    });

    it("should display ID number", () => {
      render(<ButterflyVerification />);
      expect(screen.getByText("PA-9822033217-X")).toBeInTheDocument();
    });

    it("should display expiry date", () => {
      render(<ButterflyVerification />);
      expect(screen.getByText("Nov 12, 2028")).toBeInTheDocument();
    });

    it("should display encryption status", () => {
      render(<ButterflyVerification />);
      const yesTexts = screen.getAllByText("YES");
      expect(yesTexts.length).toBeGreaterThan(0);
    });

    it("should display file security tags", () => {
      render(<ButterflyVerification />);
      expect(screen.getByText("MGL VERIFIED")).toBeInTheDocument();
    });
  });

  // ============================================
  // REVIEWER NOTES TESTS
  // ============================================

  describe("Reviewer Notes", () => {
    it("should display reviewer notes section", () => {
      render(<ButterflyVerification />);
      expect(screen.getByText(/Reviewer Notes & Feedback/)).toBeInTheDocument();
    });

    it("should display existing notes", () => {
      render(<ButterflyVerification />);
      expect(
        screen.getByText(/The Master's degree looks legitimate/),
      ).toBeInTheDocument();
    });

    it("should display note authors", () => {
      render(<ButterflyVerification />);
      expect(screen.getByText(/John Doe/)).toBeInTheDocument();
      expect(screen.getByText(/Sarah Miller/)).toBeInTheDocument();
    });

    it("should display note timestamps", () => {
      render(<ButterflyVerification />);
      expect(screen.getByText("Oct 23, 02:45 PM")).toBeInTheDocument();
      expect(screen.getByText("Today, 09:12 AM")).toBeInTheDocument();
    });

    it("should have note input area", () => {
      render(<ButterflyVerification />);
      const textarea = screen.getByPlaceholderText(
        /Type a note or specific feedback/,
      );
      expect(textarea).toBeInTheDocument();
    });

    it("should update note input value on change", async () => {
      render(<ButterflyVerification />);
      const textarea = screen.getByPlaceholderText(
        /Type a note or specific feedback/,
      );

      await userEvent.type(textarea, "Test note");
      expect(textarea.value).toBe("Test note");
    });

    it("should have submit button for notes", () => {
      const { container } = render(<ButterflyVerification />);
      const submitButton = container.querySelector(".note-submit");
      expect(submitButton).toBeInTheDocument();
    });
  });

  // ============================================
  // AUDIT TRAIL TESTS
  // ============================================

  describe("Audit Trail", () => {
    it("should display audit trail section", () => {
      render(<ButterflyVerification />);
      expect(screen.getByText("Moderation Audit Trail")).toBeInTheDocument();
    });

    it("should display audit trail controls", () => {
      render(<ButterflyVerification />);
      const filterBtn = screen.getByText("Filters");
      const exportBtn = screen.getByText("Export Logs");
      expect(filterBtn).toBeInTheDocument();
      expect(exportBtn).toBeInTheDocument();
    });

    it("should display audit trail columns", () => {
      render(<ButterflyVerification />);
      expect(screen.getByText("Timestamp")).toBeInTheDocument();
      expect(screen.getByText("Actor")).toBeInTheDocument();
      expect(screen.getByText("Role")).toBeInTheDocument();
      expect(screen.getByText("Action")).toBeInTheDocument();
      expect(screen.getByText("Details")).toBeInTheDocument();
    });

    it("should display audit trail entries", () => {
      render(<ButterflyVerification />);
      expect(screen.getByText("Document Viewed")).toBeInTheDocument();
      expect(screen.getByText("Checklist Updated")).toBeInTheDocument();
      expect(screen.getByText("Comment Added")).toBeInTheDocument();
      expect(screen.getByText("Status Changed")).toBeInTheDocument();
      expect(screen.getByText("Submission Received")).toBeInTheDocument();
    });

    it("should display all actors in audit trail", () => {
      render(<ButterflyVerification />);
      const sarahMillers = screen.getAllByText("Sarah Miller");
      expect(sarahMillers.length).toBeGreaterThan(0);
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("System")).toBeInTheDocument();
    });

    it("should display audit trail timestamps", () => {
      render(<ButterflyVerification />);
      expect(screen.getByText("Oct 24, 09:12 AM")).toBeInTheDocument();
      expect(screen.getByText("Oct 24, 09:10 AM")).toBeInTheDocument();
    });
  });

  // ============================================
  // FOOTER TESTS
  // ============================================

  describe("Footer", () => {
    it("should display footer links", () => {
      render(<ButterflyVerification />);
      expect(screen.getByText("PRIVACY POLICY")).toBeInTheDocument();
      expect(screen.getByText("PLATFORM COMPLIANCE")).toBeInTheDocument();
      expect(screen.getByText("HELP CENTER")).toBeInTheDocument();
    });

    it("should display protocol version", () => {
      render(<ButterflyVerification />);
      expect(
        screen.getByText(/BUTTERFLY VERIFICATION PROTOCOL V2.4/),
      ).toBeInTheDocument();
    });
  });

  // ============================================
  // SIDEBAR TESTS
  // ============================================

  describe("Sidebar", () => {
    it("should display pending review count", () => {
      render(<ButterflyVerification />);
      expect(screen.getByText("12")).toBeInTheDocument();
      expect(screen.getByText("Pending Today")).toBeInTheDocument();
    });

    it("should have Verifications as active nav item", () => {
      const { container } = render(<ButterflyVerification />);
      const navItems = container.querySelectorAll(".nav-item");
      const verificationsItem = Array.from(navItems).find((item) =>
        item.textContent.includes("Verifications"),
      );
      expect(verificationsItem).toHaveClass("active");
    });
  });

  // ============================================
  // INTERACTION TESTS
  // ============================================

  describe("User Interactions", () => {
    it("should allow clicking action buttons", async () => {
      render(<ButterflyVerification />);
      const verifyButton = screen.getByText("Verify Coach");

      fireEvent.click(verifyButton);
      expect(verifyButton).toBeInTheDocument();
    });

    it("should allow clicking on different coaches sequentially", async () => {
      const { container } = render(<ButterflyVerification />);
      const coachCards = container.querySelectorAll(".coach-card");

      fireEvent.click(coachCards[0]);
      expect(coachCards[0]).toHaveClass("active");

      fireEvent.click(coachCards[1]);
      expect(coachCards[1]).toHaveClass("active");
      expect(coachCards[0]).not.toHaveClass("active");
    });

    it("should persist note input when switching coaches", async () => {
      const { container } = render(<ButterflyVerification />);
      const textarea = screen.getByPlaceholderText(
        /Type a note or specific feedback/,
      );

      await userEvent.type(textarea, "Pending review");
      expect(textarea.value).toBe("Pending review");
    });
  });

  // ============================================
  // ACCESSIBILITY TESTS
  // ============================================

  describe("Accessibility", () => {
    it("should have proper heading hierarchy", () => {
      render(<ButterflyVerification />);
      const headings = screen.getAllByRole("heading");
      expect(headings.length).toBeGreaterThan(0);
    });

    it("should have accessible button elements", () => {
      render(<ButterflyVerification />);
      const buttons = screen.getAllByRole("button");
      expect(buttons.length).toBeGreaterThan(0);
    });

    it("should have input with proper label context", () => {
      render(<ButterflyVerification />);
      const searchInput = screen.getByPlaceholderText(
        "Search coaches, documents, or IDs...",
      );
      expect(searchInput).toBeInTheDocument();
      expect(searchInput).toHaveAttribute("type", "text");
    });

    it("should have textarea for notes", () => {
      render(<ButterflyVerification />);
      const textarea = screen.getByPlaceholderText(
        /Type a note or specific feedback/,
      );
      expect(textarea.tagName).toBe("TEXTAREA");
    });

    it("should have checkbox inputs in checklist", () => {
      const { container } = render(<ButterflyVerification />);
      const checkboxes = container.querySelectorAll('input[type="checkbox"]');
      expect(checkboxes.length).toBeGreaterThan(0);
    });
  });

  // ============================================
  // SNAPSHOT TEST
  // ============================================

  describe("Component Snapshot", () => {
    it("should match snapshot", () => {
      const { container } = render(<ButterflyVerification />);
      expect(container.querySelector(".butterfly-container")).toMatchSnapshot();
    });
  });
});
