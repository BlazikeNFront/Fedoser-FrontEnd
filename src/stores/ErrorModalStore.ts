import { defineStore } from "pinia";
import { ErrorModalStore } from "@/types/store/ErrorModalStore";

export const useErrorModal = defineStore("ErrorModal", {
  state: () =>
    ({
      errorModalMessage: "",
      setTimeOutId: null,
    } as ErrorModalStore),
  actions: {
    showErrorModal(errorMessage: string, timeout = true) {
      this.errorModalMessage = errorMessage;
      if (timeout) {
        this.setTimeOutId = setTimeout(() => {
          this.errorModalMessage = "";
          this.setTimeOutId = null;
        }, 7000);
      }
    },
    clearModal() {
      this.errorModalMessage = "";
      this.setTimeOutId = null;
    },
  },
});
