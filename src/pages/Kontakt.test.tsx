import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Kontakt from "./Kontakt";
import { describe, it, expect } from "vitest";

describe("Kontakt Page", () => {
  it("renders accessible form inputs", () => {
    render(
      <MemoryRouter>
        <Kontakt />
      </MemoryRouter>
    );

    // These should fail if labels are not associated with inputs
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-Mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Betreff/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nachricht/i)).toBeInTheDocument();
  });
});
