import { ApiError } from "@/types/ApiResponses";
import AxiosRequest from "@/plugins/AxiosInstance";
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { TimeInMiliseconds } from "@/constants/enums/Time";
import { CachedResponse } from "@/types/CachedResponse";
import localForage from "localforage";
import { getCurrentDateInMs } from "@/helpers/date";
import { TankDto } from "@/types/Tank";
import { GetResponse } from "@/types/ApiResponses";
import { isFunction } from "@babel/types";

interface CrudService {
  get: <T>(
    config: (AxiosRequestConfig & { useCache: boolean }) | undefined
  ) => Promise<ApiError | GetResponse<T>>;
  fetch: <T>(
    config: (AxiosRequestConfig & { useCache: boolean }) | undefined
  ) => Promise<ApiError | GetResponse<T[]>>;
  //   post: <T>() => Promise<GetResponse<T>> | ApiError;
  //   patch: <T>() => Promise<UploadResponse<T>> | ApiError;
  //   remove: <T>() => Promise<UploadResponse<T>> | ApiError;
}
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
async function getResponse<T>(
  url: string,
  config?: (AxiosRequestConfig & { useCache: boolean }) | undefined
): Promise<GetResponse<T> | ApiError> {
  try {
    const data = await AxiosRequest.get<T>(url, config);
    if (data) return { data: data.data, success: true };
    return { success: false, statusCode: null };
  } catch (error: unknown) {
    if (apiErrorTypeGuard(error)) return error;
    return { success: false, statusCode: null };
  }
}
async function fetchRequest<T>(
  url: string,
  config?: (AxiosRequestConfig & { useCache: boolean }) | undefined
): Promise<GetResponse<T[]> | ApiError> {
  try {
    const data = await AxiosRequest.get<T[]>(url, config);
    if (data) return { data: data.data, success: true };
    return { success: false, statusCode: null };
  } catch (error: unknown) {
    if (apiErrorTypeGuard(error)) return error;
    return { success: false, statusCode: null };
  }
}
// async function getResponse<T>(
//   url: string,
//   config?: (AxiosRequestConfig & { useCache: boolean }) | undefined
// ): Promise<GetResponse<T> | ApiError> {
//   try {
//     const data = await AxiosInstance.get<T>(url, config);
//     if (data) return { data: data.data, success: true };
//     return { success: false, statusCode: null };
//   } catch (error: unknown) {
//     if (apiErrorTypeGuard(error)) return error;
//     return { success: false, statusCode: null };
//   }
// }
function createServiceForEndpoint<T>(
  url: string,
  config = { useCache: false }
): CrudService {
  const { useCache } = config;
  //   const fetch = <T>() => ();
  //   const post = () => ({});
  //   const patch = () => ({});
  //   const remove = () => ({});
  return {
    get: <T>(
      config: (AxiosRequestConfig & { useCache: boolean }) | undefined
    ) => getResponse<T>(url, { ...config, useCache: !!useCache }),
    fetch: <T>(
      config: (AxiosRequestConfig & { useCache: boolean }) | undefined
    ) => fetchRequest<T>(url, { ...config, useCache: !!useCache }),
  };
}

// export const TankEndopoints = {
//     getTank:(config)=>useBaseRequest<TankDto>('get','endpoint',config)
// }
const baseRequestTypes = {
  GET: "GET",
  FETCH: "FETCH",
  POST: "POST",
  PATCH: "PATCH",
  DELETE: "DELETE",
} as const;
async function useBaseRequest<T>(
  url: string,
  requestType?: keyof typeof baseRequestTypes,
  config?: AxiosRequestConfig & { useCache: boolean }
) {
  switch (requestType) {
    case baseRequestTypes.GET: {
      return await getResponse<T>(url, config);
    }
    case baseRequestTypes.FETCH: {
      return await fetchRequest<T>(url, config);
    }
    case baseRequestTypes.POST: {
      return await getResponse<T>(url, config);
    }
    case baseRequestTypes.PATCH: {
      return await getResponse<T>(url, config);
    }
    case baseRequestTypes.DELETE: {
      return await getResponse<T>(url, config);
    }
    default:
      return await getResponse<T>(url, config);
  }
}
