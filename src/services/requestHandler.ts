import { ApiError, ApiResponse } from "@/types/ApiResponses";
import AxiosRequest from "@/plugins/AxiosInstance";
import { AxiosRequestConfig } from "axios";
import { TankDto } from "@/types/Tank";
import localForage from "localforage";
import { CachedResponse } from "@/types/CachedResponse";
import { getCurrentDateInMs } from "@/helpers/date";
import { TimeInMiliseconds } from "@/constants/enums/Time";

const REQUESTS_TYPES = {
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
  DELETE: "DELETE",
} as const;
const REQUESTS = {
  [REQUESTS_TYPES.GET]: AxiosRequest.get,
  [REQUESTS_TYPES.POST]: AxiosRequest.post,
  [REQUESTS_TYPES.PATCH]: AxiosRequest.patch,
  [REQUESTS_TYPES.DELETE]: AxiosRequest.delete,
} as const;

const apiErrorTypeGuard = (error: unknown): error is ApiError => {
  if (
    typeof error === "object" &&
    error !== null &&
    "success" in error &&
    "statusCode" in error
  )
    return true;
  return false;
};

const handleError = (error: any) => {
  console.log(error);
};
async function getDataFromIndexedDB<T>(key: string) {
  const storedKeys = await localForage.keys();
  if (!storedKeys.includes(key)) return null;

  const storedValue = (await localForage.getItem(key)) as CachedResponse<T>;
  if (
    !storedValue.timestamp ||
    getCurrentDateInMs() - +storedValue?.timestamp > +TimeInMiliseconds.WEEK
  ) {
    await localForage.removeItem(key);
    return null;
  }

  return storedValue.data;
}

async function setItemInIndexedDB<C>(key: string, data: C) {
  await localForage.setItem(key, {
    data,
    timestamp: getCurrentDateInMs(),
  });
}

async function requestHandler<T>(
  url: string,
  type: keyof typeof REQUESTS,
  useCache = false,
  axiosConfig?: AxiosRequestConfig,
  uploadData?: Partial<T>
): Promise<ApiResponse<T> | ApiError> {
  try {
    if (useCache) {
      const data = await getDataFromIndexedDB<T>(url);
      if (data) return { data, success: true };
    }
    const isUploadRequest = type === "POST" || type === "PATCH";
    if (isUploadRequest && !uploadData) {
      throw Error("Data parameter is not provided");
    }
    if (axiosConfig?.url) {
      url += `/${axiosConfig.url}`;
      if (url.includes("pdf")) axiosConfig.responseType = "blob";
    }

    const { data } = isUploadRequest
      ? await REQUESTS[type]<T>(url, uploadData, axiosConfig)
      : await REQUESTS[type]<T>(url, axiosConfig);
    if (data) {
      if (useCache) setItemInIndexedDB(url, data);
      return { data, success: true };
    }
    return { success: false, statusCode: null };
  } catch (error: unknown) {
    handleError(error);
    if (apiErrorTypeGuard(error)) return error;

    return { success: false, statusCode: null };
  }
}

export function createEndpointAPI<T>(url: string, useCache = false) {
  return {
    get: (config?: AxiosRequestConfig) =>
      requestHandler<T>(url, REQUESTS_TYPES.GET, useCache, config),
    fetch: (config?: AxiosRequestConfig) =>
      requestHandler<T[]>(url, REQUESTS_TYPES.GET, useCache, config),
    post: (data: T, config?: AxiosRequestConfig) =>
      requestHandler<T>(url, REQUESTS_TYPES.POST, useCache, config, data),
    patch: (data: Partial<T>, config?: AxiosRequestConfig) =>
      requestHandler<T>(url, REQUESTS_TYPES.PATCH, useCache, config, data),
    delete: (config?: AxiosRequestConfig) =>
      requestHandler<T>(url, REQUESTS_TYPES.DELETE, useCache, config),
  };
}
export const Tank = createEndpointAPI<TankDto>("endpoint");
