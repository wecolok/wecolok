export type ApiResponse<T> = {
  data: T;
  message?: string;
  errorCode?: number;
};
