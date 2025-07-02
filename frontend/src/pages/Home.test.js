import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Home from "./Home";
import { BrowserRouter } from "react-router-dom";

// Mock fetch API globally
beforeAll(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  fetch.mockClear();
});

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

test("renders Picture of the Day loading message", async () => {
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
    })
  );
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ results: [] }),
    })
  );

  renderWithRouter(<Home />);
  expect(screen.getByText(/loading picture of the day/i)).toBeInTheDocument();
});

test("renders Tech Transfer filter and applies filter", async () => {
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}), // For APOD
    })
  );
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          results: [
            ["id", "Tech Title", "x", "climate saving device", "x", "x", "x", "x", "x", "x", "http://image.com/tech.jpg"],
          ],
        }),
    })
  );

  renderWithRouter(<Home />);

  await waitFor(() => {
    expect(screen.getByText(/tech title/i)).toBeInTheDocument();
  });

  const select = screen.getByRole("combobox");
  fireEvent.change(select, { target: { value: "Environment" } });
  expect(select.value).toBe("Environment");
});

test("clicking Explain with AI triggers loading state", async () => {
  // APOD mock
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
    })
  );
  // Tech Transfer mock
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          results: [
            ["id", "AI Tech", "x", "autonomous drone tech", "x", "x", "x", "x", "x", "x", "http://img.com/drone.jpg"],
          ],
        }),
    })
  );

  renderWithRouter(<Home />);

  await waitFor(() => {
    expect(screen.getByText(/ai tech/i)).toBeInTheDocument();
  });

  // Mock the /explain-tech endpoint
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ explanation: "This tech helps with drones." }),
    })
  );

  fireEvent.click(screen.getByText(/explain with ai/i));

  await waitFor(() => {
    expect(screen.getByText(/ai says/i)).toBeInTheDocument();
  });
});
