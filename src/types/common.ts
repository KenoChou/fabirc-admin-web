export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface PaginationRequest {
  page: number;
  pageSize: number;
}
