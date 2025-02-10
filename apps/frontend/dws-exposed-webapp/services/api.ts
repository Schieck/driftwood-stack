import { SearchResponse } from "@/types/api"

export type SearchFilters = Record<string, string>

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_HOST_PREFIX}${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}`

const request = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${url}`, options)

  if (!response.ok) {
    throw new Error(
      `HTTP error! status: ${response.status}, message: ${response.statusText}`
    )
  }

  return response.json()
}

export const apiService = {
  /**
   * Search for driftwood items.
   * @param query Natural language query.
   * @param filters Key-value pairs for search filters.
   * @param includeRecommendations Whether to include recommendations.
   * @returns SearchResponse
   */
  searchDriftwood: (
    query: string,
    filters: SearchFilters = {},
    includeRecommendations = false
  ): Promise<SearchResponse> =>
    request<SearchResponse>("/ml/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        filters,
        include_recommendations: includeRecommendations,
      }),
    }),
}
