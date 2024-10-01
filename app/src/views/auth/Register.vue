<template>
  <div class="register-container" v-if="!isLoading">
    <div class="register-item glass-panel">
      <h1 class="register-welcome">{{ $t("views.register.header") }}</h1>
      <div class="register-inputs">
        <div class="form-group">
          <label for="username">{{ $t("auth.username.title") }}</label>
          <input
            type="text"
            id="username"
            :placeholder="$t('auth.username.input')"
            v-bind:class="`${
              usernameMeta.validated ? (usernameMeta.valid ? 'valid' : 'invalid') : ''
            }`"
            v-model="username"
            @input="checkUser()"
          />
          <p class="invalid-feedback" style="text-align: left">{{ usernameError }}</p>
        </div>

        <div class="form-group">
          <label for="email">{{ $t("auth.email.title") }}</label>
          <input
            type="email"
            id="email"
            :placeholder="$t('auth.email.input')"
            v-bind:class="`${
              emailMeta.validated ? (emailMeta.valid ? 'valid' : 'invalid') : ''
            }`"
            v-model="email"
            @input="checkMail()"
          />
          <p class="invalid-feedback" style="text-align: left">{{ emailError }}</p>
        </div>

        <div class="form-group">
          <label for="password">{{ $t("auth.password.title") }}</label>
          <input
            type="password"
            id="password"
            :placeholder="$t('auth.password.input')"
            v-bind:class="`${
              passwordMeta.validated ? (passwordMeta.valid ? 'valid' : 'invalid') : ''
            }`"
            v-model="password"
          />
          <p class="invalid-feedback" style="text-align: left">{{ passwordError }}</p>
        </div>
      </div>
      <div class="register-button">
        <div class="button" @click="register()">{{ $t("views.register.button") }}</div>
        <p>Already have an account? <a href="/auth/login">Login!</a></p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { checkUsername, checkEmail, registerUser } from "@/services/auth/api";
import yupDe from "../../i18n/yup-de";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "Register",
  setup() {
    const isLoading = ref(true);

    yup.setLocale(yupDe);

    const { t } = useI18n();

    const { meta } = useForm();
    const {
      value: username,
      errorMessage: usernameError,
      meta: usernameMeta,
      validate: validateUsername,
    } = useField(
      "username",
      yup.string().required().min(5).label(t("auth.username.title")),
      { label: "Username" }
    );

    const checkUser = async () => {
      await validateUsername();

      try {
        if ((username.value as string).length < 5) return;
        const res = await checkUsername(username.value as string);
        usernameMeta.valid = res;
        if (res) usernameError.value = "This username already exists";
      } catch (error) {
        console.error("Error checking username availability", error);
      }
    };

    const {
      value: email,
      errorMessage: emailError,
      meta: emailMeta,
      validate: validateEmail,
    } = useField("email", yup.string().email().required().label(t("auth.email.title")), {
      label: "Email",
    });

    const checkMail = async () => {
      await validateEmail();

      try {
        if (!(email.value as string).includes("@")) return;
        const res = await checkEmail(email.value as string);
        emailMeta.valid = res;
        if (res) emailError.value = "This email already exists.";
      } catch (error) {
        console.error("Error checking email availability", error);
      }
    };

    const { value: password, errorMessage: passwordError, meta: passwordMeta } = useField(
      "password",
      yup.string().required().min(8).label(t("auth.password.title"))
    );

    const register = async () => {
      if (usernameMeta.valid && emailMeta.valid && passwordMeta.valid) {
        isLoading.value = true;

        const res = await registerUser(
          username.value as string,
          email.value as string,
          password.value as string
        );
        if (res) {
          window.location.href = "/auth/otp?email=" + email.value;
        }
      }
    };

    isLoading.value = false;
    return {
      isLoading,
      meta,
      username,
      usernameError,
      usernameMeta,
      checkUser,
      email,
      emailError,
      emailMeta,
      checkMail,
      password,
      passwordError,
      passwordMeta,
      register,
    };
  },
});
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.register-item {
  padding: 10px;
  display: flex;
  align-items: center;
  background-color: var(--glass-bg);
  border-radius: 12px;
  width: 600px;
  flex-direction: column;
  gap: 10px;
}

.register-welcome {
  text-align: center;
  font-size: 30px;
}

.register-img {
  width: 80%;
  height: 230px;
}

.register-inputs {
  display: flex;
  padding: 10px 20px;
  border-radius: 12px;
  width: 70%;
  flex-direction: column;
  gap: 10px;
}

.register-button {
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: column;
  padding-top: 20px;
  padding-bottom: 30px;
}

.register-button .button {
  width: 80% !important;
}
</style>
