import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";

describe("LandingPage", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );
    expect(document.body).toBeInTheDocument();
  });
});
