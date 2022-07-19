import { defineStore } from "pinia";
import { UserStore } from "@/types/store/UserStore";
import { AuthPayloadDto } from "@/types/AuthPayload";
import { LoginService } from "@/services/endpoints";

import { TOKEN_EXPIRATION_TIME_IN_MS } from "@/constants/global";

export const useUserStore = defineStore("UserStore", {
  state: () =>
    ({
      email: null,
      isTokenProvided: false,
      loginTimestamp: null,
    } as UserStore),
  actions: {
    async loginAction(email: string, password: string) {
      const result = await LoginService.post(
        new AuthPayloadDto(email, password)
      );
      if (result.success) {
        this.email = email;
        this.isTokenProvided = true;
        this.loginTimestamp = Date.now();
        localStorage.setItem("userStore", JSON.stringify(this.$state));
        return result;
      }
      return result;
    },
    async logoutAction() {
      const result = await LoginService.delete();
      if (result.success) {
        this.clearUser();
        localStorage.setItem("userStore", JSON.stringify(this.$state));
      }
    },
    checkForCredentialsInLocalStorage() {
      const credentialsInJson = localStorage.getItem("userStore");
      if (credentialsInJson) {
        const credentials = JSON.parse(credentialsInJson);
        Date.now() - credentials.loginTimestamp < TOKEN_EXPIRATION_TIME_IN_MS
          ? (this.$state = credentials)
          : this.clearUser();
      }
      if (this.$state.isTokenProvided) return true;
      return false;
    },
    clearUser() {
      this.email = null;
      this.isTokenProvided = false;
      this.loginTimestamp = null;
    },
  },
});
