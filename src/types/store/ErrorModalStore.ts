import { Router } from "vue-router";
export interface ErrorModalStore {
  errorModalMessage: string;
  setTimeOutId: ReturnType<typeof setTimeout> | null;
}
