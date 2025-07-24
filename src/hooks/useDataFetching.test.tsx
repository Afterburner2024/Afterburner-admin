import { renderHook, waitFor, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { useDataFetching } from './useDataFetching';
import { fetcher } from '../utils/apiClient';
import type { Member } from '../types/responseTypes';

// Mock the fetcher function
vi.mock('../utils/apiClient', () => ({
  fetcher: vi.fn(),
}));

// Create a react-query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // Disable retries for tests
    },
  },
});

// Wrapper component to provide the QueryClient
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const testMembers: Member[] = [
  { userId: 1, userName: 'Alice', userEmail: 'alice@example.com', registeredAt: '2023-01-01' },
  { userId: 2, userName: 'Bob', userEmail: 'bob@example.com', registeredAt: '2023-01-02' },
  { userId: 3, userName: 'Charlie', userEmail: 'charlie@example.com', registeredAt: '2023-01-03' },
];

describe('useDataFetching Hook', () => {
  beforeEach(() => {
    // Clear mocks and query cache before each test
    vi.clearAllMocks();
    queryClient.clear();
  });

  it('should fetch data successfully and return it', async () => {
    (fetcher as Mock).mockResolvedValue(testMembers);

    const { result } = renderHook(
      () => useDataFetching<Member>({
        endpoint: '/api/members',
        queryKey: 'members',
        searchFields: ['userName', 'userEmail'],
      }),
      { wrapper }
    );

    // Wait for the query to finish
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(fetcher).toHaveBeenCalledWith('/api/members');
    expect(result.current.data).toEqual(testMembers);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should handle API errors correctly', async () => {
    const errorMessage = 'Failed to fetch';
    (fetcher as Mock).mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(
      () => useDataFetching<Member>({
        endpoint: '/api/members',
        queryKey: 'members',
        searchFields: ['userName', 'userEmail'],
      }),
      { wrapper }
    );

    // Wait for the query to fail
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error).not.toBeNull();
    expect(result.current.data).toEqual([]); // initialData is [], so filteredAndSortedData is []
  });

  it('should filter data based on search query', async () => {
    (fetcher as Mock).mockResolvedValue(testMembers);

    const { result } = renderHook(
      () => useDataFetching<Member>({
        endpoint: '/api/members',
        queryKey: 'members',
        searchFields: ['userName'],
      }),
      { wrapper }
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    act(() => {
      result.current.setSearchQuery('Alice');
    });

    expect(result.current.data).toEqual([testMembers[0]]);
  });

  it('should sort data based on sort option', async () => {
    (fetcher as Mock).mockResolvedValue(testMembers);

    const { result } = renderHook(
      () => useDataFetching<Member>({
        endpoint: '/api/members',
        queryKey: 'members',
        searchFields: ['userName'],
      }),
      { wrapper }
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    act(() => {
      // Sort by userName in descending order
      result.current.setSortOption('userName-desc');
    });

    expect(result.current.data).toEqual([
      testMembers[2], // Charlie
      testMembers[1], // Bob
      testMembers[0], // Alice
    ]);
  });
});
