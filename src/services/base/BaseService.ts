import { ApiError } from "@/types/ApiError";

export default class BaseApiService {
  constructor(private resource: string) {}

  getEndpointUrl(
    id = "",
    resourceSuffix?: string,
    resourcePrefix?: string
  ): string {
    return `${resourcePrefix ? resourcePrefix + "/" : ""}${this.resource}${
      id ? "/" + id : ""
    }${resourceSuffix ? "/" + resourceSuffix : ""}`;
  }

  // Error interface needs to be created...
  handleError(error: ApiError): ApiError {
    console.log("errorHandler", error);
    if (error.statusCode) return error;
    return { success: false, statusCode: null };
  }
}
