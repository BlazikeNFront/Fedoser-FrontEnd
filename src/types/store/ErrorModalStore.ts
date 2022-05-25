export interface ErrorModalStore {
  errorModalMessage: string;
  setTimeOutId: ReturnType<typeof setTimeout> | null;
}
