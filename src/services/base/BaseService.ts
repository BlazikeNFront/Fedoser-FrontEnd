import { ApiError } from "@/types/ApiResponses";
import router from "@/router/index";
import { ApiErrorCodes } from "@/constants/enums/ApiErrorCodes";
import { RoutesNames } from "@/constants/routesNames/RoutesNames";

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
    if (error.statusCode === ApiErrorCodes.UNAUTHORIZED)
      router.push({ name: RoutesNames.HOME });
    if (error.statusCode) return error;
    return { success: false, statusCode: null };
  }
}
