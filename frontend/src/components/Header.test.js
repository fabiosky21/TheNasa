import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { BrowserRouter } from "react-router-dom";

test("renders the NASA Explorer header", () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

  const heading = screen.getByText(/Welcome to NASA Explorer/i);
  expect(heading).toBeInTheDocument();
});
