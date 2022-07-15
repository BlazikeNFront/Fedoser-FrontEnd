<template>
  <div class="d-flex flex-column align-center justify-center">
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
          :rules="[FormRules.required, FormRules.maxLength(30)]"
          @input="loginForm.showUnauthorizedError = false"
          ><template #appendInner>
            <v-icon
              @click="changePasswordVisibility"
              :icon="passwordVisibility.icon"
              class="pointer"
            ></v-icon>
          </template>
        </v-text-field>
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
        class="mx-4 mt-7 f-15"
        keypath="auth.notHaveAccount"
        tag="p"
        scope="global"
      >
        <template #button>
          <v-btn
            @click="showErrorModal($t('alphaInfo.signUpDisabled'), false)"
            color="blue"
            class="mx-2 my-2 f-15"
            v-t="'global.clickHere'"
          />
        </template>
      </i18n-t>
    </home-form-card>
    <v-card
      color="dark-grey"
      class="pa-3 mt-4 d-flex flex-column align-center justify-center"
      style="width: clamp(30rem, 100%, 60rem)"
    >
      <v-icon size="35" color="yellow">{{ Icons.ALERT }}</v-icon>
      <p class="f-15 text-center">{{ $t("auth.serverResponseInfo") }}</p>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, ComponentPublicInstance } from "vue";
import { useRouter } from "vue-router";
import { RoutesNames } from "@/constants/routesNames/RoutesNames";
import { useUserStore } from "@/stores/UserStore";
import { Icons } from "@/constants/icons/MdiIcons";
import { FormRules } from "@/helpers/FormRules";
import { InputTypes } from "@/constants/global";
import HomeFormCard from "@/components/modules/home/HomeFormCard.vue";
import TransitionExpand from "@/components/common/TransitionExpand.vue";
import { useErrorModal } from "@/stores/ErrorModalStore";

const { loginAction } = useUserStore();

const { showErrorModal } = useErrorModal();
const router = useRouter();
const loginForm = reactive({
  email: "test@mail.com",
  password: "password",
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
  const actionResult = await loginAction(loginForm.email, loginForm.password);
  loginForm.loader = false;
  if (!actionResult.success && actionResult?.statusCode) {
    loginForm.showUnauthorizedError = true;
    return;
  }

  router.push({ name: RoutesNames.APP_HOME });
}
</script>
<style lang="scss" scoped>
@import "@/sass/global";
</style>
