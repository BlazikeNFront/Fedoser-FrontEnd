import { ApiError, ApiResponse } from "@/types/ApiResponses";
import { AxiosRequestConfig } from "axios";
import { reactive } from "vue";
// Type with allowed states seems better, but for some reason TS picks only initial type in hook return //REFACTOR
// type RequestState<T> =
//   | {
//       loading: false;
//       data: null;
//       error: string;
//     }
//   | {
//       loading: true;
//       data: null;
//       error: string;
//     }
//   | {
//       loading: false;
//       data: T;
//       error: string;
//     };
interface RequestState<T> {
  loading: boolean;
  data: null | T;
  error: string;
}
export default function useBaseRequest<T>() {
  const requestState: RequestState<T> = reactive({
    loading: false,
    data: null,
    error: "",
  });
  async function fetchData(
    callback: (
      config?: AxiosRequestConfig
    ) => Promise<ApiError | ApiResponse<T>>,
    callbackConfig?: AxiosRequestConfig
  ) {
    requestState.loading = true;
    const request = await callback(callbackConfig);
    if (request.success) {
      requestState.data = request.data;
    } else requestState.error = request.error;
    requestState.loading = false;
  }
  return { requestState, fetchData };
}
