import axios from "axios";
import { LocalStorageKeys } from "@/constants/LocalStorageKeys";
import { FALLBACK_LOCALE } from "@/i18n/i18n";
export const setBaseUrl = () => {
  if (process.env.NODE_ENV !== "development")
    return process.env.VUE_APP_BACKEND_PRODUCTION_URL;
  return process.env.VUE_APP_BACKEND_DEVELOPMENT_URL;
};
const AxiosInstance = axios.create({
  baseURL: setBaseUrl(),
  timeout: 7000,
  maxBodyLength: 5000,
  maxContentLength: 5000,

  headers: {
    "Content-type": "application/json; charset=UTF-8",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
  withCredentials: true,
});

AxiosInstance.interceptors.request.use((request) => {
  if (request.headers)
    request.headers["X-User-Lang"] =
      localStorage.getItem(LocalStorageKeys.USER_LANGUAGE) || FALLBACK_LOCALE;

  return request;
});

AxiosInstance.interceptors.response.use(
  (response) => {
    if (response.headers["content-type"] === "application/pdf") {
      return response;
    }
    return response;
  },
  (error) => {
    throw error.response;
  }
);

export default AxiosInstance;
