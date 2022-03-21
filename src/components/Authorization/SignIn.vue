<template>
  <v-card
    class="mx-auto pb-6 sign-in-card text-white text-center"
    style="width: clamp(30rem, 100%, 60rem)"
  >
    <v-progress-linear
      :active="loginForm.loader"
      :indeterminate="loginForm.loader"
      color="blue"
      height="5"
    />
    <h4 class="f-2 my-3">Sign in</h4>
    <v-form ref="signInForm" class="mx-3 my-4">
      <v-text-field
        class="sign-in__textfield font-weight-bold"
        v-model.trim="loginForm.username"
        type="username"
        label="Username"
        :rules="[FormRules.required, FormRules.maxLength(30)]"
      />
      <v-text-field
        class="sign-in__textfield"
        v-model.trim="loginForm.password"
        :type="passwordVisibility.type"
        label="Password"
        :append-inner-icon="passwordVisibility.icon"
        @click:append-inner="changePasswordVisibility"
        :rules="[FormRules.required, FormRules.maxLength(30)]"
      />
      <v-btn @click="loginRequest" class="f-15" width="200" color="blue"
        >Login</v-btn
      >
    </v-form>
    <p class="mt-7 d-block f-15">
      You don't have an account?<v-btn color="blue" class="mx-2 f-125"
        >Click here</v-btn
      >
      to sign up
    </p>
  </v-card>
</template>

<script setup lang="ts">
import { ref, reactive, ComponentPublicInstance } from "vue";
import { useRouter } from "vue-router";
import { RoutesNames } from "@/constants/routesNames/RoutesNames";
import { useUserStore } from "@/stores/UserStore";
import { Icons } from "@/constants/icons/MdiIcons";
import { FormRules } from "@/constants/FormRules/FormRules";
const { loginAction } = useUserStore();
const router = useRouter();
const loginForm = reactive({
  username: "testmail",
  password: "testPassword",
  loader: false,
});
const passwordVisibility = reactive({
  icon: Icons.EYE_ICON,
  type: "password",
});
const signInForm = ref<ComponentPublicInstance<HTMLFormElement>>();
function changePasswordVisibility() {
  if (passwordVisibility.type === "password") {
    passwordVisibility.icon = Icons.EYE_OFF_ICON;
    passwordVisibility.type = "text";
  } else {
    passwordVisibility.icon = Icons.EYE_ICON;
    passwordVisibility.type = "password";
  }
}
async function loginRequest() {
  loginForm.loader = true;
  const validationData = await signInForm.value?.validate();

  if (!validationData.valid) return;
  const actionResult = await loginAction({ ...loginForm });
  if (actionResult) {
    router.push({ name: RoutesNames.APP_HOME });
  }
  loginForm.loader = false;
}
</script>
<style lang="scss" scoped>
.sign-in-card {
  background-color: rgba(#024564, 0.5);
}
.sign-in__textfield::v-deep .v-messages {
  font-size: 1.5rem;
  font-weight: 500;
}
</style>
