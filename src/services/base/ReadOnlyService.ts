import AxiosInstance from "@/plugins/AxiosInstance";
import BaseService from "./BaseService";
import { ApiError, GetResponse } from "@/types/ApiResponses";
import { TimeInMiliseconds } from "@/constants/enums/Time";
import { CachedResponse } from "@/types/CachedResponse";
import localForage from "localforage";
import { getCurrentDateInMs } from "@/helpers/date";
export default class ReadonlyApiService<T> extends BaseService {
  constructor(resource: string, private useCache = false) {
    super(resource);
    this.useCache = useCache;
  }

  async get(
    id: string,
    resourceSuffix?: string,
    resourcePrefix?: string
  ): Promise<GetResponse<Required<T>> | ApiError> {
    const url = this.getEndpointUrl(id, resourceSuffix, resourcePrefix);

    try {
      if (this.useCache) {
        const cachedResponse = await this.getItemFromIndexedDB<Required<T>>(
          url
        );

        if (cachedResponse) return { data: cachedResponse.data, success: true };
      }
      let response;
      if (resourceSuffix?.includes("pdf")) {
        response = await AxiosInstance.get<Required<T>>(url, {
          responseType: "blob",
        });
        return { data: response.data, success: true };
      } else response = await AxiosInstance.get<Required<T>>(url);

      if (this.useCache) {
        await this.setItemInIndexedDB<Required<T>>(url, response.data);
      }
      return { data: response.data, success: true };
    } catch (error: any) {
      //catch accept only unknown or any type/ its possible to work with unknown with type casting but in my opinion doing it here its overkill
      if (error?.data as ApiError) {
        this.handleError(error.data as ApiError);
        return error.data as ApiError;
      }
      return { success: false, statusCode: null };
    }
  }
  async fetch(
    config = {},
    resourceSuffix?: string,
    resourcePrefix?: string
  ): Promise<GetResponse<Required<T>[]> | ApiError> {
    const url = this.getEndpointUrl(resourceSuffix, resourcePrefix);

    try {
      if (this.useCache) {
        const cachedResponse = await this.getItemFromIndexedDB<Required<T>[]>(
          url
        );
        if (cachedResponse) return { data: cachedResponse.data, success: true };
      }
      const response = await AxiosInstance.get<Required<T>[]>(url, config);
      if (this.useCache) {
        await this.setItemInIndexedDB<T[]>(url, response.data);
      }
      return { data: response.data, success: true };
    } catch (error: any) {
      //catch accept only unknown or any type/ its possible to work with unknown with type casting but in my opinion doing  it here its overkill

      if (error?.data as ApiError) {
        this.handleError(error.data as ApiError);
        return error.data as ApiError;
      }
      return { success: false, statusCode: null };
    }
  }
  private async getItemFromIndexedDB<C>(key: string) {
    const storedKeys = await localForage.keys();
    if (!storedKeys.includes(key)) return null;

    const storedValue = (await localForage.getItem(key)) as CachedResponse<C>;
    if (
      !storedValue.timestamp ||
      getCurrentDateInMs() - +storedValue?.timestamp > +TimeInMiliseconds.WEEK
    ) {
      await localForage.removeItem(key);
      return null;
    }

    return storedValue;
  }

  private async setItemInIndexedDB<C>(key: string, data: C) {
    await localForage.setItem(key, {
      data,
      timestamp: getCurrentDateInMs(),
    });
  }
}
