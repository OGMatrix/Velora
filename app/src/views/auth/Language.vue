<template>
  <div class="language-container">
    <div class="language-item glass-panel">
      <h1 class="language-header">{{ $t('views.language.header') }}</h1>
      <div class="language-flags">
        <div class="flag-card" @click="selectLocale(msg.flag)" :class="iso === locale.locale.value ? 'active' : ''" v-for="(msg, iso) in messages" :key="iso">
            <fai :icon="['fa', 'check']" class="icon" v-if="iso === locale.locale.value" />
            <country-flag class="flag" :country="msg.iso" size="normal" />
            <div class="flag-content">
                <h1 class="title">{{ msg.name }}</h1>
                <h1 class="subtitle">{{ $t('languages.' + iso) }}</h1>
            </div>
        </div>
      </div>
      <div class="language-buttons">
        <a class="button" href="/">
          {{ $t('views.language.next') }}
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { useStorage } from '@vueuse/core';

export default defineComponent({
  name: "Language",
  setup() {
    interface LanguageMessages {
      [key: string]: any;
    }
    const localeStorage = useStorage("locale", "en");

    const locale = useI18n();
    const messages: LanguageMessages = locale.messages.value;

    const selectLocale = async(newLocale: string) => {
      locale.locale.value = newLocale;
      localeStorage.value = newLocale;
    }

    return {
        locale,
        messages,
        selectLocale
    };
  },
});
</script>

<style scoped>
.language-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.language-item {
  padding: 10px;
  display: flex;
  align-items: center;
  background-color: var(--glass-bg);
  border-radius: 12px;
  width: 600px;
  flex-direction: column;
  gap: 10px;
}

.language-header {
  text-align: center;
  font-size: 30px;
}

.language-buttons {
  display: flex;
  padding: 10px 20px;
  border-radius: 12px;
  width: 80%;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 30px;
}

.language-flags {
  display: flex;
  padding: 10px 20px;
  border-radius: 12px;
  align-items: center;
  width: 70%;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 30px;
}

.flag-card {
    width: 100%;
    align-items: center !important;
    display: flex !important; 
    border-radius: 12px !important;
    background-color: var(--glass-bg);
    padding: 15px;
    transition: background .2s ease;
    margin-bottom: 5px !important;
}

.flag-card:hover {
    background-color: var(--secondary-bg) !important;
    cursor: pointer;
}

.flag-card .icon {
    font-size: 25px !important;
    color: var(--secondary2) !important;
}

.flag-card .flag-content .title {
    font-size: 20px;
    font-weight: bold;
}

.flag-card .flag-content .subtitle {
    font-size: 15px;
}

.flag-card.active {
    background-color: var(--primary-accent) !important;
}

.flag-card .flag {
    border-radius: 6px;
    margin-left: 14px !important;
    margin: 0 !important;
    margin-right: -0.9em !important;
}

.flag-card .flag-content {
    text-align: left !important;
    margin-left: 15px !important;
}

.userlanguage .bottom {
    margin-top: auto;
    margin-bottom: 20px;
}
</style>
