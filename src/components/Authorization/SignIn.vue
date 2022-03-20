<template>
  <div class="d-flex flex-column sign-in">
    <div class="d-flex flex-column">
      <div class="form-control" style="margin: 10px">
        <label>Email</label>
        <input v-model="loginForm.username" type="text" />
      </div>
      <div class="form-control">
        <label>password</label>
        <input v-model="loginForm.password" type="text" />
      </div>
      <button class="button" @click="loginRequest">Login</button>
      <div class="d-flex flex-column">
        <p class="text-center">
          You don't have account ?
          <button
            @click="$router.push({ name: RoutesNames.SIGN_UP })"
            class="button"
            style="margin: 0 auto"
          >
            Click here
          </button>
          to sign Up
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { RoutesNames } from "@/constants/routesNames/RoutesNames";
import { useUserStore } from "@/stores/UserStore";
const { loginAction } = useUserStore();
const router = useRouter();
const loginForm = reactive({
  username: "testmail",
  password: "testPassword",
});
const error = ref("");

function validateForm() {
  const { username, password } = loginForm;
  if (username.length < 4) {
    error.value = "Incorrect Email";
    return false;
  }
  if (password.length < 3) {
    error.value = "Incorrect password";
    return false;
  }
  return true;
}
async function loginRequest() {
  if (!validateForm) return;
  const actionResult = await loginAction({ ...loginForm });
  if (actionResult) {
    router.push({ name: RoutesNames.APP_HOME });
  }
}
</script>

<style scoped lang="scss">
.sign-in {
  background: rgba(0, 0, 0, 0.7);
  border-radius: 25px;
}
</style>
