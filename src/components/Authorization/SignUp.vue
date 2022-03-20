<template>
  <form class="d-flex flex-column">
    <div class="form-control">
      <label>Email</label>
      <input v-model="form.email" type="text" />
    </div>
    <div class="form-control">
      <label>Password</label>
      <input v-model="form.password" type="text" />
    </div>
    <div class="form-control">
      <label> Repeat password</label>
      <input v-model="form.repeatedPassword" type="text" />
    </div>
    <p v-if="error">{{ error }}</p>
    <button @click="signUpRequest" class="button">Sign Up</button>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { validateEmail } from "@/helpers/rules/email";
import { SignUpService } from "@/services/endpoints/Authorization";
import { SignUpDTO } from "@/utils/DTOs/SignUp.dto";
import { useRouter } from "vue-router";
const router = useRouter();
const form = reactive({
  email: "",
  password: "",
  repeatedPassword: "",
});
const error = ref("");
function validateForm() {
  const { email, password, repeatedPassword } = form;
  if (email.length < 4 || validateEmail(email)) {
    error.value = "Incorrect Email";
    return false;
  }
  if (password.length < 6) {
    error.value = "Password should contain at least 6 characters";
    return false;
  }
  if (password !== repeatedPassword) {
    error.value = "Password do not match";
    return false;
  }
  return true;
}
async function signUpRequest() {
  if (!validateForm) return;
  const result = await SignUpService.create(
    new SignUpDTO(form.email, form.password, form.repeatedPassword)
  );
  if (result.success) router.push({ name: "Home" });
  else error.value = "An error occured, try again later";
}
</script>

<style lang="scss" scoped>
form {
  background-color: rgba(0, 0, 0, 0.75);
  padding: 1rem 2rem;
  border-radius: 25px;
}
.form-control {
  label {
    color: white;
    font-size: 2rem;
  }
}
</style>
