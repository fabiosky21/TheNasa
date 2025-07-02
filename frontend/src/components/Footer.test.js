import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import { BrowserRouter } from "react-router-dom";

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

test("renders logo and navigation links", () => {
  renderWithRouter(<Footer />);

  // Check logo
  expect(screen.getByAltText(/logo/i)).toBeInTheDocument();

  // Check navigation links
  expect(screen.getByText(/home/i)).toBeInTheDocument();
  expect(screen.getByText(/media search/i)).toBeInTheDocument();
  expect(screen.getByText(/neo lookup/i)).toBeInTheDocument();
});

test("renders GitHub and LinkedIn icons with correct links", () => {
  renderWithRouter(<Footer />);

  const githubLink = screen.getByRole("link", { name: /github/i });
  expect(githubLink).toHaveAttribute("href", expect.stringContaining("github.com/fabiosky21"));

  const linkedinLink = screen.getByRole("link", { name: /linkedin/i });
  expect(linkedinLink).toHaveAttribute("href", expect.stringContaining("linkedin.com/in/fabiorodrigocv"));
});

test("displays current year in copyright", () => {
  renderWithRouter(<Footer />);
  const year = new Date().getFullYear();
  expect(screen.getByText(new RegExp(`${year}`))).toBeInTheDocument();
});
