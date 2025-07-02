import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DataSpace from "./DataSpace";
import { BrowserRouter } from "react-router-dom";

// Mock Supabase client
jest.mock("@supabase/supabase-js", () => {
  return {
    createClient: () => ({
      storage: {
        from: () => ({
          upload: jest.fn().mockResolvedValue({
            data: { path: "images/fake-image.png" },
            error: null,
          }),
          getPublicUrl: () => ({
            data: { publicUrl: "https://fake-storage-url.com/images/fake-image.png" },
          }),
        }),
      },
      from: () => ({
        insert: jest.fn().mockResolvedValue({ error: null }),
      }),
    }),
  };
});


const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

test("shows validation message when submitting empty form", () => {
  renderWithRouter(<DataSpace />);
  fireEvent.click(screen.getByRole("button", { name: /submit/i }));
  expect(screen.getByText(/please fill out all fields/i)).toBeInTheDocument();
});

test("renders all form fields", () => {
  renderWithRouter(<DataSpace />);
  expect(screen.getByPlaceholderText(/your name/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/your email/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/description/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
});

test("submits the form successfully and shows confirmation", async () => {
  renderWithRouter(<DataSpace />);

  const file = new File(["image content"], "test.jpg", { type: "image/jpeg" });

  fireEvent.change(screen.getByPlaceholderText(/your name/i), {
    target: { value: "Fabio", name: "name" },
  });
  fireEvent.change(screen.getByPlaceholderText(/your email/i), {
    target: { value: "fabio@example.com", name: "email" },
  });
  fireEvent.change(screen.getByPlaceholderText(/description/i), {
    target: { value: "Spotted a comet", name: "description" },
  });
  fireEvent.change(screen.getByTestId("image-upload"), {
    target: { files: [file], name: "image" },
  });

  fireEvent.click(screen.getByRole("button", { name: /submit/i }));

  // ship loading image shows
  expect(await screen.findByAltText(/submitting/i)).toBeInTheDocument();

  // status appears
  expect(await screen.findByText(/submission sent!/i)).toBeInTheDocument();

});
