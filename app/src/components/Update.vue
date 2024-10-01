<template></template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { getProfile } from "../services/user/api";
import { useAuthStore } from "../store/auth";
import { useSettingsStore } from "../store/settings";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Update",
  components: {},
  setup() {
    const authStore = useAuthStore();
    const settingsStore = useSettingsStore();
    const route = useRoute();

    (async () => {
      const res = await getProfile();

      if (res) {
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res));
        authStore.auth = res;
        if (res.status == 0) {
          window.location.href = "/auth/otp?email=" + res.email;
        } else {
            /* Check if Setup complete */
            if (!settingsStore.themeSetupDone && !route.fullPath.includes("/setup")) window.location.href = '/setup'
        }
      } else {
        localStorage.removeItem("user");
        authStore.auth = null;
        window.location.href = "/auth/login";
      }
    })();

    // window.location.href = '/otp?email=luki.welke@gmail.com'

    return {};
  },
});
</script>
