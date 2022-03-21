import AxiosInstance from "@/plugins/AxiosInstance";
import ReadonlyApiService from "@/services/base/ReadOnlyService";
import { ApiError } from "@/types/ApiError";
import { UploadResponse } from "@/types/UploadDataResponse";
class ModelApiService<T> extends ReadonlyApiService<T> {
  constructor(resource: string) {
    super(resource);
  }

  async create(
    data: T,
    resourceSuffix?: string,
    resourcePrefix?: string
  ): Promise<UploadResponse<T> | ApiError> {
    try {
      const response = await AxiosInstance.post(
        this.getEndpointUrl("", resourceSuffix, resourcePrefix),
        data
      );
      return { data: response.data, success: true };
    } catch (error: any) {
      //catch accept only unknown or any type/ its possible to work with unknown with type casting but in my opinion here doing it here its overkill

      this.handleError(error);
      if (error?.data) return error.data as ApiError;
      else return { success: false, statusCode: null };
    }
  }

  async update(
    id: string,
    data: Partial<T>,
    resourceSuffix?: string,
    resourcePrefix?: string
  ): Promise<UploadResponse<Partial<T>> | ApiError> {
    try {
      const response = await AxiosInstance.patch(
        this.getEndpointUrl(id, resourceSuffix, resourcePrefix),
        data
      );
      return { data: response.data, success: true };
    } catch (error: any) {
      //catch accept only unknown or any type/ its possible to work with unknown with type casting but in my opinion here doing it here its overkill

      this.handleError(error);
      if (error.data) return error.data as ApiError;
      else return { success: false, statusCode: null };
    }
  }

  async delete(
    id: string,
    resourceSuffix?: string,
    resourcePrefix?: string
  ): Promise<UploadResponse<T> | ApiError> {
    try {
      const response = await AxiosInstance.delete(
        this.getEndpointUrl(id, resourceSuffix, resourcePrefix)
      );
      return { data: response.data, success: true };
    } catch (error: any) {
      //catch accept only unknown or any type/ its possible to work with unknown with type casting but in my opinion here doing it here its overkill

      this.handleError(error);
      if (error.data) return error.data as ApiError;
      else return { success: false, statusCode: null };
    }
  }
}

export default ModelApiService;
