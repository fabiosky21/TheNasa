// src/pages/SpaceSightseeing.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import SpaceSightseeing from "./SpaceSightseeing";
import { BrowserRouter } from "react-router-dom";
import { within } from "@testing-library/react";

jest.mock("@supabase/supabase-js", () => ({
  __esModule: true,
  createClient: () => ({
    from: () => ({
      select: () => ({
        order: () =>
          Promise.resolve({
            data: [
              {
                id: "1",
                name: "Alice",
                email: "alice@example.com",
                description: "Saw a UFO",
                image_url: "https://example.com/ufo.jpg",
              },
              {
                id: "2",
                name: "Bob",
                email: "bob@example.com",
                description: "Bright meteor",
                image_url: null,
              },
            ],
            error: null,
          }),
      }),
    }),
  }),
}));

describe("SpaceSightseeing page", () => {
  const renderPage = () =>
    render(
      <BrowserRouter>
        <SpaceSightseeing />
      </BrowserRouter>
    );

  test("shows loading text initially", () => {
    renderPage();
    expect(screen.getByText(/Loading\.\.\./i)).toBeInTheDocument();
  });

  test("renders sightings after load", async () => {
    renderPage();

    // Alice’s card
    const aliceCard = await screen.findByTestId("sightseeing-card-Alice");
    const { getByText: getByTextInAlice, getByAltText: getByAltTextInAlice } =
      within(aliceCard);

    expect(getByTextInAlice(/Email:/i)).toBeInTheDocument();
    expect(getByTextInAlice(/alice@example\.com/i)).toBeInTheDocument();
    expect(getByTextInAlice(/Description:/i)).toBeInTheDocument();
    expect(getByTextInAlice(/Saw a UFO/i)).toBeInTheDocument();
    expect(getByAltTextInAlice(/Alice/i)).toHaveAttribute(
      "src",
      "https://example.com/ufo.jpg"
    );

    // Bob’s card
    
    const bobCard = screen.getByTestId("sightseeing-card-Bob");
    const { getByText: getByTextInBob, queryByAltText: queryByAltTextInBob } =
      within(bobCard);
    expect(getByTextInBob(/Email:/i)).toBeInTheDocument();
    expect(getByTextInBob(/bob@example\.com/i)).toBeInTheDocument();
    expect(getByTextInBob(/Description:/i)).toBeInTheDocument();
    expect(queryByAltTextInBob(/Bob/i)).toBeNull();
  });
});
