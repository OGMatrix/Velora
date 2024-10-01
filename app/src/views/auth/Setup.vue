<template>
  <div class="setup-container">
    <Update />
    <div class="setup-item glass-panel">
      <SetupTheme v-if="tab === 'theme'" />
      <SetupFiles v-if="tab === 'media'" />
      <div class="setup-buttons">
        <a class="button" @click="next()">
          {{ $t("views.setup.theme.continue") }}
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import SetupTheme from "@/components/Setup/Theme.vue";
import SetupFiles from "@/components/Setup/Files.vue";

export default defineComponent({
  name: "Setup",
  components: { SetupTheme, SetupFiles },
  setup() {
    const route = useRoute();
    const tab = ref(route.query.tab ? route.query.tab : "theme");

    const next = () => {
      window.location.href = "/setup?tab=media";
    };

    return { tab, next };
  },
});
</script>

<style scoped>
.setup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.setup-item {
  padding: 10px;
  display: flex;
  align-items: center;
  background-color: var(--glass-bg);
  border-radius: 12px;
  width: 850px;
  flex-direction: column;
  gap: 10px;
}

.setup-buttons {
  display: flex;
  padding: 10px 20px;
  border-radius: 12px;
  width: 70%;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 30px;
}
</style>
