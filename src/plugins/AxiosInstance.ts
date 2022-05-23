import axios from "axios";
import { i18nInstance } from "@/i18n/i18n";

const AxiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV !== "development"
      ? process.env.VUE_APP_PRODUCTION_URL
      : process.env.VUE_APP_DEVELOPMENT_URL,
  timeout: 7000,
  maxBodyLength: 5000,
  maxContentLength: 5000,

  headers: {
    "Content-type": "application/json; charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "X-User-Lang": `${i18nInstance.global.locale.value}`,
  },
  withCredentials: true,
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
