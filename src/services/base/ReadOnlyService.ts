import AxiosInstance from "@/plugins/AxiosInstance";
import BaseService from "./BaseService";
import { ApiError } from "@/types/ApiError";
import { GetResponse } from "@/types/GetResponse";
import { TimeInMiliseconds } from "@/constants/enums/Time";
import { CachedResponse } from "@/types/CachedResponse";
import localForage from "localforage";
enum ForageMethods {
  GET = "get",
  SET = "set",
}

export default class ReadonlyApiService<T> extends BaseService {
  constructor(resource: string, private useCache = false) {
    super(resource);
  }

  async get(
    id: string,
    resourceSuffix?: string,
    resourcePrefix?: string
  ): Promise<GetResponse<T> | ApiError> {
    const url = this.getEndpointUrl(id, resourceSuffix, resourcePrefix);
    try {
      const response = await AxiosInstance.get<T>(url);
      return { data: response.data, success: true };
    } catch (error: any) {
      //catch accept only unknown or any type/ its possible to work with unknown with type casting but in my opinion doing it here its overkill
      if (error.data as ApiError) {
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
      const response = await AxiosInstance.get<T[]>(url, config);
      return { data: response.data, success: true };
    } catch (error: any) {
      //catch accept only unknown or any type/ its possible to work with unknown with type casting but in my opinion doing  it here its overkill

      if (error.data as ApiError) {
        this.handleError(error.data as ApiError);
        return error.data as ApiError;
      }
      return { success: false, statusCode: null };
    }
  }
  private async getItemFromIndexedDB(key: string) {
    const storedKeys = await localForage.keys();
    if (!storedKeys.includes(key)) return null;

    const storedValue = (await localForage.getItem(key)) as CachedResponse<T>;
    if (!storedValue.timestamp) return null;
    const now = new Date().getTime();

    if (+now - +storedValue?.timestamp > +TimeInMiliseconds.WEEK) {
      await localForage.removeItem(key);
      return null;
    }
    return storedValue;
  }

  private async setItemInIndexedDB(key: string, data: T) {
    const now = new Date().getTime();
    await localForage.setItem(key, { ...data, timestamp: now });
  }
}
