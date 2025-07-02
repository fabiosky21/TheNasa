import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MediaSearch from "../pages/MediaSearch";
import { BrowserRouter } from "react-router-dom";

afterEach(() => {
  jest.restoreAllMocks();
});

// Helper to render the page within a router
const renderPage = () =>
  render(
    <BrowserRouter>
      <MediaSearch />
    </BrowserRouter>
  );

test("renders search input and static image before search", () => {
  // Default mock for image search (no API call yet)
  jest.spyOn(global, "fetch").mockResolvedValueOnce({
    json: () =>
      Promise.resolve({
        collection: { items: [] },
      }),
  });

  renderPage();

  expect(
    screen.getByPlaceholderText(/search for moon, mars/i)
  ).toBeInTheDocument();
  expect(screen.getByText(/start exploring nasa/i)).toBeInTheDocument();
});

test("performs a search and displays result", async () => {
  const imageItem = {
    data: [
      {
        title: "Mars Rover",
        description: "A Mars rover in action",
        media_type: "image",
        nasa_id: "mars_rover_001",
      },
    ],
    links: [{ href: "https://example.com/mars_rover.jpg" }],
  };

  // Mock two fetches: initial search and the effect-driven refetch
  jest
    .spyOn(global, "fetch")
    .mockImplementationOnce(() =>
      Promise.resolve({ json: () => Promise.resolve({ collection: { items: [imageItem] } }) })
    )
    .mockImplementationOnce(() =>
      Promise.resolve({ json: () => Promise.resolve({ collection: { items: [imageItem] } }) })
    );

  renderPage();

  fireEvent.change(screen.getByPlaceholderText(/search/i), {
    target: { value: "Mars" },
  });
  fireEvent.click(screen.getByText("Search"));

  // Should see the image result and its alt text
  expect(await screen.findByText("Mars Rover")).toBeInTheDocument();
  expect(screen.getByAltText("Mars Rover")).toBeInTheDocument();
});

test("filters by media type: video", async () => {
  const videoItem = {
    data: [
      {
        title: "Moon Landing",
        media_type: "video",
        nasa_id: "moon_landing",
        description: "The Apollo 11 mission.",
      },
    ],
    links: [{ href: "https://example.com/moon_thumb.jpg" }],
  };

  // Mock two fetch calls (search + effect) both returning the video item
  jest
    .spyOn(global, "fetch")
    .mockImplementationOnce(() =>
      Promise.resolve({ json: () => Promise.resolve({ collection: { items: [videoItem] } }) })
    )
    .mockImplementationOnce(() =>
      Promise.resolve({ json: () => Promise.resolve({ collection: { items: [videoItem] } }) })
    );

  renderPage();

  fireEvent.click(screen.getByText("Videos")); // switch to video mode
  fireEvent.change(screen.getByPlaceholderText(/search/i), {
    target: { value: "Moon" },
  });
  fireEvent.click(screen.getByText("Search"));

  // Now “Moon Landing” must appear
  expect(await screen.findByText(/moon landing/i)).toBeInTheDocument();
});

test("quick filter applies search term", async () => {
  const imageItem = {
    data: [
      {
        title: "Mars Rover",
        description: "A Mars rover in action",
        media_type: "image",
        nasa_id: "mars_rover_001",
      },
    ],
    links: [{ href: "https://example.com/mars_rover.jpg" }],
  };

  jest
    .spyOn(global, "fetch")
    .mockImplementationOnce(() =>
      Promise.resolve({ json: () => Promise.resolve({ collection: { items: [imageItem] } }) })
    )
    .mockImplementationOnce(() =>
      Promise.resolve({ json: () => Promise.resolve({ collection: { items: [imageItem] } }) })
    );

  renderPage();

  fireEvent.click(screen.getByText("Mars"));

  expect(await screen.findByText("Mars Rover")).toBeInTheDocument();
});

test("result limit applies correctly", async () => {
  // Create 10 dummy items
  const items = Array.from({ length: 10 }, (_, i) => ({
    data: [{ title: `Item ${i}`, media_type: "image", nasa_id: `id${i}` }],
    links: [{ href: `url${i}` }],
  }));
  jest
    .spyOn(global, "fetch")
    .mockImplementationOnce(() =>
      Promise.resolve({ json: () => Promise.resolve({ collection: { items } }) })
    )
    .mockImplementationOnce(() =>
      Promise.resolve({ json: () => Promise.resolve({ collection: { items } }) })
    );

  renderPage();

  fireEvent.click(screen.getByText("5"));
  fireEvent.change(screen.getByPlaceholderText(/search/i), {
    target: { value: "Test" },
  });
  fireEvent.click(screen.getByText("Search"));

  // Should see at most 5 headings
  const headings = await screen.findAllByRole("heading", { level: 3 });
  expect(headings.length).toBeLessThanOrEqual(5);
});

test("clicking thumbnail opens modal and Escape closes it", async () => {
  const imageItem = {
    data: [
      {
        title: "Mars Rover",
        media_type: "image",
        nasa_id: "mars_rover_001",
      },
    ],
    links: [{ href: "https://example.com/mars_rover.jpg" }],
  };

  jest
    .spyOn(global, "fetch")
    .mockImplementationOnce(() =>
      Promise.resolve({ json: () => Promise.resolve({ collection: { items: [imageItem] } }) })
    )
    .mockImplementationOnce(() =>
      Promise.resolve({ json: () => Promise.resolve({ collection: { items: [imageItem] } }) })
    );

  renderPage();

  fireEvent.change(screen.getByPlaceholderText(/search/i), {
    target: { value: "Mars" },
  });
  fireEvent.click(screen.getByText("Search"));

  // Wait for thumbnail, then click it
  const thumb = await screen.findByAltText("Mars Rover");
  fireEvent.click(thumb);

  // Close button has aria-label="Close modal"
  expect(screen.getByLabelText(/close modal/i)).toBeInTheDocument();

  fireEvent.keyDown(window, { key: "Escape", code: "Escape" });
  expect(screen.queryByLabelText(/close modal/i)).toBeNull();
});
