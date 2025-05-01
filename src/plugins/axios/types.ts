export interface Response<T> {
  data: T;
  is_success: boolean;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}
