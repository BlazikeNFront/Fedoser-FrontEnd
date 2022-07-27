export interface UploadResponse<T> {
  data?: T;
  success: true;
}
export interface ApiError {
  success: false;
  statusCode: number | null;
  error: string;
}
export interface ApiResponse<T> {
  data: T;
  success: true;
}
