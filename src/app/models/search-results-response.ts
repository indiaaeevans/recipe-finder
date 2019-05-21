export interface SearchResultsResponse {
  baseUri: string;
  number: number;
  offset: number;
  processingTimeMs: number;
  results: [];
  totalResults: number;
}
