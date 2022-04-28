<template>
  <home-form-card
    :loader="signUpFormData.loader"
    :header-text="$t('auth.signUp')"
    :id="IdAttributes.SIGN_UP_FORM"
  >
    <v-form ref="signUpForm" class="mx-3 my-4">
      <v-text-field
        class="font-weight-bold home-form-card__textfield f-15"
        v-model.trim="signUpFormData.email"
        type="email"
        :label="$t('global.email')"
        autocomplete="on"
        :rules="[
          FormRules.required,
          FormRules.maxLength(30),
          FormRules.isEmail,
        ]"
      />
      <v-text-field
        class="font-weight-bold home-form-card__textfield"
        v-model.trim="signUpFormData.password"
        type="password"
        :label="$t('auth.password')"
        autocomplete="new-password"
        :rules="[FormRules.required, FormRules.maxLength(30)]"
      />
      <v-text-field
        class="font-weight-bold home-form-card__textfield"
        v-model.trim="signUpFormData.confirmedPassword"
        type="password"
        :label="$t('auth.confirmPassword')"
        :rules="[FormRules.required, FormRules.maxLength(30)]"
      />
      <v-btn
        @click="signUpRequest"
        class="f-15"
        width="200"
        color="blue"
        :disabled="signUpFormData.loader"
        v-t="'auth.signUp'"
      />
    </v-form>
    <i18n-t
      class="mt-7 f-15"
      keypath="auth.alreadyHaveAccount"
      tag="p"
      scope="global"
    >
      <template #button>
        <v-btn
          @click="$router.push({ name: RoutesNames.SIGN_IN })"
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
import { SignUpService } from "@/services/endpoints/Authorization";
import { SignUpDTO } from "@/utils/DTOs/SignUp.dto";
import { FormRules } from "@/helpers/FormRules";
import HomeFormCard from "@/components/modules/home/HomeFormCard.vue";
import { RoutesNames } from "@/constants/routesNames/RoutesNames";
import { IdAttributes } from "@/constants/IdAttributes";
import { useRouter } from "vue-router";
const router = useRouter();
const signUpFormData = reactive({
  email: "test@mail.com",
  password: "testPassword1",
  confirmedPassword: "testPassword1",
  loader: false,
});
const signUpForm = ref<ComponentPublicInstance<HTMLFormElement>>();

async function signUpRequest() {
  const validationData = await signUpForm.value?.validate();
  if (!validationData.valid) return;
  signUpFormData.loader = true;
  const result = await SignUpService.create(
    new SignUpDTO(
      signUpFormData.email,
      signUpFormData.password,
      signUpFormData.confirmedPassword
    )
  );
  signUpFormData.loader = false;
  console.log(result);
  if (result.success) router.push({ name: RoutesNames.SIGN_IN });
}
</script>
<style lang="scss">
@import "@/sass/global";
</style>
