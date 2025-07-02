import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NEOWS from '../pages/NEOWS';
import { BrowserRouter } from 'react-router-dom';

// Mock NEOWSCharts to inspect its invocation
jest.mock('../components/NEOWSCharts', () => ({ data }) => (
  <div data-testid="neows-charts">Charts count: {data.length}</div>
));

describe('NEOWS page', () => {
  const renderPage = () => render(
    <BrowserRouter>
      <NEOWS />
    </BrowserRouter>
  );

  beforeEach(() => {
    jest.restoreAllMocks();
    // nsure no cached data
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
  });

  test('renders header, intro, and placeholder before search', () => {
    renderPage();
    expect(screen.getByText(/Near Earth Object Lookup/i)).toBeInTheDocument();
    expect(screen.getByText(/Ready to see what is out in the space/i)).toBeInTheDocument();
    // Placeholder image present
    expect(screen.getByAltText(/Ready to search/i)).toBeInTheDocument();
  });

  test('loads NEO data and displays charts after search', async () => {
    const fakeData = {
      near_earth_objects: {
        '2025-07-02': [ { id: '1' }, { id: '2' } ],
        '2025-07-09': [ { id: '3' } ],
      }
    };
    // Mock fetch for NEO endpoint
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve(fakeData)
    });

    renderPage();

    fireEvent.click(screen.getByText(/Search NEOs/i));

    // Loading indicator appears
    expect(screen.getByText(/Searching NASA’s database/i)).toBeInTheDocument();

    // Wait for charts
    const charts = await screen.findByTestId('neows-charts');
    expect(charts).toHaveTextContent('Charts count: 3');
  });

  test('shows error message on invalid API response', async () => {
    // Mock fetch returning invalid shape
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve({ foo: 'bar' })
    });

    renderPage();
    fireEvent.click(screen.getByText(/Search NEOs/i));

    // Error should display
    expect(await screen.findByText(/Invalid response from NASA API/i)).toBeInTheDocument();
  });

  test('uses cached data if available', () => {
    const cached = JSON.stringify([ { id: 'x' } ]);
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(cached);

    renderPage();
    // click search
    fireEvent.click(screen.getByText(/Search NEOs/i));
    // charts render immediately from cache
    expect(screen.getByTestId('neows-charts')).toHaveTextContent('Charts count: 1');
  });
});
