import {describe, expect, test} from '@jest/globals';
import DriftwoodInteractiveSection from '@/components/organism/DriftwoodInteractiveSection';
import { apiService } from '@/services/api';

jest.mock('@/services/api', () => ({
  apiService: {
    searchDriftwood: jest.fn(),
  },
}));

describe('DriftwoodInteractiveSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component correctly', () => {
    render(<DriftwoodInteractiveSection />);

    expect(screen.getByPlaceholderText('Search among driftwoods...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /get started/i })).toBeInTheDocument();
  });

  it('updates search query and calls API on input change', async () => {
    (apiService.searchDriftwood as jest.Mock).mockResolvedValueOnce({
      results: [{ id: 1, name: 'Driftwood Item' }],
    });

    render(<DriftwoodInteractiveSection />);

    const searchInput = screen.getByPlaceholderText('Search among driftwoods...');
    fireEvent.change(searchInput, { target: { value: 'Ocean' } });

    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(apiService.searchDriftwood).toHaveBeenCalledWith('Ocean');
    });
  });

  it('shows loading state while fetching data', async () => {
    (apiService.searchDriftwood as jest.Mock).mockImplementationOnce(
      () => new Promise(() => {})
    );

    render(<DriftwoodInteractiveSection />);

    const searchInput = screen.getByPlaceholderText('Search among driftwoods...');
    fireEvent.change(searchInput, { target: { value: 'Wood' } });

    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('handles API errors gracefully', async () => {
    (apiService.searchDriftwood as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

    render(<DriftwoodInteractiveSection />);

    const searchInput = screen.getByPlaceholderText('Search among driftwoods...');
    fireEvent.change(searchInput, { target: { value: 'Coral' } });

    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(screen.getByText(/failed to load data/i)).toBeInTheDocument();
    });
  });

  it('updates pagination correctly', async () => {
    (apiService.searchDriftwood as jest.Mock).mockResolvedValue({ results: [] });

    render(<DriftwoodInteractiveSection />);

    const nextPageButton = screen.getByRole('button', { name: /next/i });
    
    fireEvent.click(nextPageButton);

    await waitFor(() => {
      expect(apiService.searchDriftwood).toHaveBeenCalledTimes(1);
    });
  });
});
