import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import NEOWSCharts from "./NEOWSCharts";

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

const mockData = [
  {
    is_potentially_hazardous_asteroid: true,
    estimated_diameter: {
      meters: { estimated_diameter_max: 120.5 },
    },
    close_approach_data: [
      {
        relative_velocity: { kilometers_per_hour: "35000" },
        miss_distance: { kilometers: "400000" },
      },
    ],
  },
  {
    is_potentially_hazardous_asteroid: false,
    estimated_diameter: {
      meters: { estimated_diameter_max: 40.8 },
    },
    close_approach_data: [
      {
        relative_velocity: { kilometers_per_hour: "27000" },
        miss_distance: { kilometers: "10000000" },
      },
    ],
  },
];

test("renders NEOWSCharts and shows charts after delay", async () => {
  render(<NEOWSCharts data={mockData} />);
  fireEvent.click(screen.getByRole("button", { name: /show charts/i }));

  // Wait for the 1.5s timeout + rendering
  await waitFor(
    () => {
      expect(screen.getByText(/hazardous vs not hazardous/i)).toBeInTheDocument();
    },
    { timeout: 2000 }
  );

  expect(screen.getByText(/diameter vs velocity/i)).toBeInTheDocument();
  expect(screen.getByText(/risk distance categories/i)).toBeInTheDocument();
});
