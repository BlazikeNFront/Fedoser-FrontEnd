export interface UploadResponse<T> {
  data?: T;
  success: true;
}
export interface ApiError {
  success: false;
  statusCode: number | null;
}
export interface ApiResponse<T> {
  data: T;
  success: true;
}
export interface GetResponse<T> {
  data: T;
  success: true;
}
