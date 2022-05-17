import AxiosInstance from "@/plugins/AxiosInstance";
import BaseService from "./BaseService";
import { ApiError } from "@/types/ApiError";
import { GetResponse } from "@/types/GetResponse";
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
  ): Promise<GetResponse<T> | ApiError> {
    const url = this.getEndpointUrl(id, resourceSuffix, resourcePrefix);
    try {
      if (this.useCache) {
        const cachedResponse = await this.getItemFromIndexedDB<T>(
          this.getEndpointUrl()
        );
        if (cachedResponse) return { data: cachedResponse.data, success: true };
      }
      const response = await AxiosInstance.get<T>(url);
      if (this.useCache) {
        await this.setItemInIndexedDB<T>(this.getEndpointUrl(), response.data);
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
  ): Promise<GetResponse<T[]> | ApiError> {
    const url = this.getEndpointUrl(resourceSuffix, resourcePrefix);

    try {
      if (this.useCache) {
        const cachedResponse = await this.getItemFromIndexedDB<T[]>(
          this.getEndpointUrl()
        );
        if (cachedResponse) return { data: cachedResponse.data, success: true };
      }
      const response = await AxiosInstance.get<T[]>(url, config);
      if (this.useCache) {
        await this.setItemInIndexedDB<T[]>(
          this.getEndpointUrl(),
          response.data
        );
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
