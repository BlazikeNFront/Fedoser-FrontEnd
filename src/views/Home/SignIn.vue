<template>
  <home-form-card :loader="loginForm.loader" :header-text="$t('auth.signIn')">
    <v-form ref="signInForm" class="mx-3 my-4">
      <v-text-field
        class="font-weight-bold home-form-card__textfield"
        v-model.trim="loginForm.email"
        type="username"
        :label="$t('global.email')"
        :rules="[FormRules.required, FormRules.maxLength(30)]"
        @input="loginForm.showUnauthorizedError = false"
      />
      <v-text-field
        class="font-weight-bold home-form-card__textfield"
        v-model.trim="loginForm.password"
        :type="passwordVisibility.type"
        :label="$t('auth.password')"
        :append-inner-icon="passwordVisibility.icon"
        @click:append-inner="changePasswordVisibility"
        :rules="[FormRules.required, FormRules.maxLength(30)]"
        @input="loginForm.showUnauthorizedError = false"
      />
      <v-btn
        @click="loginRequest"
        class="f-15"
        width="200"
        color="blue"
        :disabled="loginForm.loader"
        v-t="'auth.signIn'"
      />
    </v-form>
    <transition-expand>
      <p
        v-if="loginForm.showUnauthorizedError"
        v-t="'auth.unauthorized'"
        class="text-error f-15"
      ></p>
    </transition-expand>
    <i18n-t
      class="mt-7 f-15"
      keypath="auth.notHaveAccount"
      tag="p"
      scope="global"
    >
      <template #button>
        <v-btn
          @click="$router.push({ name: RoutesNames.SIGN_UP })"
          color="blue"
          class="mx-2 f-125"
          v-t="'global.clickHere'"
        />
      </template>
    </i18n-t>
  </home-form-card>
</template>

<script setup lang="ts">
import { ref, reactive, ComponentPublicInstance } from "vue";
import { useRouter } from "vue-router";
import { RoutesNames } from "@/constants/routesNames/RoutesNames";
import { useUserStore } from "@/stores/UserStore";
import { Icons } from "@/constants/icons/MdiIcons";
import { FormRules } from "@/constants/FormRules/FormRules";
import { InputTypes } from "@/constants/global";
import HomeFormCard from "@/components/views/home/HomeFormCard.vue";
import TransitionExpand from "@/components/common/TransitionExpand.vue";

const { loginAction } = useUserStore();
const router = useRouter();
const loginForm = reactive({
  email: "testmail",
  password: "testPassword",
  loader: false,
  showUnauthorizedError: false,
});
const passwordVisibility = reactive({
  icon: Icons.EYE_ICON,
  type: InputTypes.PASSWORD,
});
const signInForm = ref<ComponentPublicInstance<HTMLFormElement>>();
function changePasswordVisibility() {
  if (passwordVisibility.type === InputTypes.PASSWORD) {
    passwordVisibility.icon = Icons.EYE_OFF_ICON;
    passwordVisibility.type = InputTypes.TEXT;
  } else {
    passwordVisibility.icon = Icons.EYE_ICON;
    passwordVisibility.type = InputTypes.PASSWORD;
  }
}
async function loginRequest() {
  const validationData = await signInForm.value?.validate();

  if (!validationData.valid) return;
  loginForm.loader = true;
  const actionResult = await loginAction({ ...loginForm });
  loginForm.loader = false;
  if (!actionResult.success && actionResult?.statusCode) {
    loginForm.showUnauthorizedError = true;
    return;
  }

  router.push({ name: RoutesNames.APP_HOME });
}
</script>
<style lang="scss">
@import "@/styles/global";
</style>
