<template>
  <home-form-card :loader="loginForm.loader" header-text="Sign In">
    <v-form ref="signInForm" class="mx-3 my-4">
      <v-text-field
        class="font-weight-bold home-form-card__textfield"
        v-model.trim="loginForm.email"
        type="username"
        label="Email"
        :rules="[FormRules.required, FormRules.maxLength(30)]"
      />
      <v-text-field
        class="font-weight-bold home-form-card__textfield"
        v-model.trim="loginForm.password"
        :type="passwordVisibility.type"
        label="Password"
        :append-inner-icon="passwordVisibility.icon"
        @click:append-inner="changePasswordVisibility"
        :rules="[FormRules.required, FormRules.maxLength(30)]"
      />
      <v-btn
        @click="loginRequest"
        class="f-15"
        width="200"
        color="blue"
        :disabled="loginForm.loader"
        >Login</v-btn
      >
    </v-form>
  </home-form-card>
</template>

<script setup lang="ts">
import { ref, reactive, ComponentPublicInstance } from "vue";
import { useRouter } from "vue-router";
import { RoutesNames } from "@/constants/routesNames/RoutesNames";
import { useUserStore } from "@/stores/UserStore";
import { Icons } from "@/constants/icons/MdiIcons";
import { FormRules } from "@/constants/FormRules/FormRules";
import HomeFormCard from "@/components/Home/HomeFormCard.vue";

const { loginAction } = useUserStore();
const router = useRouter();
const loginForm = reactive({
  email: "testmail",
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
<style lang="scss">
@import "@/styles/global";
</style>
