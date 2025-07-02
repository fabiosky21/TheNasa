import { render, screen, fireEvent } from "@testing-library/react";
import AIAssistant from "./AIAssistant";

// Mock fetch globally
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ explanation: "This is an AI response." }),
    })
  );
});


afterEach(() => {
  fetch.mockClear();
});

test("AI Assistant opens when astronaut icon is clicked", () => {
  render(<AIAssistant />);
  const icon = screen.getByRole("img", { name: /astronaut/i });
  fireEvent.click(icon);
  expect(screen.getByText(/do you need help/i)).toBeInTheDocument();
});

test("AI Assistant sends user message and receives AI reply", async () => {
  render(<AIAssistant />);
  const icon = screen.getByRole("img", { name: /astronaut/i });
  fireEvent.click(icon);

  const input = screen.getByPlaceholderText(/ask me something/i);
  fireEvent.change(input, { target: { value: "What is a black hole?" } });

  const askButton = screen.getByRole("button", { name: /ask/i });
  fireEvent.click(askButton);

  // User message should appear
  expect(screen.getByText(/what is a black hole\?/i)).toBeInTheDocument();

  // Wait for AI response
// Wai for AI response using findByText
expect(await screen.findByText(/this is an ai response/i)).toBeInTheDocument();


  // Ensurrin fetch was called with correct URL
  expect(fetch).toHaveBeenCalledWith(
    "http://localhost:5000/explain-tech",
    expect.objectContaining({
      method: "POST",
    })
  );
});
