import { reactive } from "vue";
type RequestState<T> =
  | {
      loading: false;
      data: null;
      error: false;
    }
  | {
      loading: true;
      data: null;
      error: false;
    }
  | {
      loading: false;
      data: T;
      error: false;
    }
  | {
      loading: false;
      data: null;
      error: string;
    };
export default function useBaseRequest<T>() {
  const requestState: RequestState<T> = reactive({
    loading: false,
    data: null,
    error: false,
  });
    async function fetchData(callback:Function) {
        requestState.loading = true;
        const request = await callback() 
        if (request.success) {
            requestState.data = request.data;
        }
        else requestState.error = request.error
        requestState.loading = true;
  }
  return {requestState,fetchData};
}
