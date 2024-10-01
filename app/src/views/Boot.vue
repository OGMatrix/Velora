<template>
  <div class="boot-container">
    <Update />
    <div class="boot-item glass-panel">
      <h1 class="boot-welcome">{{ $t('views.boot.welcome') }}</h1>
      <img class="boot-img" src="/velora-logo.png" />
      <div class="boot-buttons">
        <a class="button" href="/auth/register">
          {{ $t('views.boot.register') }}
        </a>
        <div class="button">
          {{ $t('views.boot.login') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStorage } from "@vueuse/core";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Boot",
  setup() {
    const localeStorage = useStorage("locale", null);
    console.log(localeStorage.value)
    if (localeStorage.value === null) window.location.href = "/auth/language"
    return {}
  }
})
</script>

<style scoped>
.boot-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.boot-item {
  padding: 10px;
  display: flex;
  align-items: center;
  background-color: var(--glass-bg);
  border-radius: 12px;
  width: 600px;
  flex-direction: column;
  gap: 10px;
}

.boot-welcome {
  text-align: center;
  font-size: 30px;
  margin-bottom: -70px;
}

.boot-img {
  width: 80%;
  height: 230px;
}

.boot-buttons {
  display: flex;
  margin-top: -50px;
  padding: 10px 20px;
  border-radius: 12px;
  width: 70%;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 30px;
}
</style>
