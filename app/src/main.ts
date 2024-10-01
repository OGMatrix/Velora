import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";


/* Components */
import WindowNav from "@/components/WindowNav.vue";
import Update from '@/components/Update.vue';
import CountryFlag from 'vue-country-flag-next'
import VOtpInput from "vue3-otp-input";

/* Styling */
import "@/assets/css/styling.css";
import "@/assets/css/main.css";
import "@/assets/css/input.css";


/* FontAwesome */
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faWindowMinimize } from "@fortawesome/free-solid-svg-icons";
import { faWindowMaximize } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
library.add(faWindowMinimize, faWindowMaximize, faClose, faCheck, faPaperPlane);


/* Pinia */
import { createPinia } from 'pinia';
const pinia = createPinia()


/* i18n */
import { createI18n } from 'vue-i18n'
import de from "./i18n/de.json";
import en from "./i18n/en.json";
const i18n = createI18n({
  locale: 'de',
  fallbackLocale: 'en',
  formatFallbackMessages: true,
  messages: {
      de,
      en
  },
  legacy: false,
})

/* App Creation */
createApp(App)
  .use(router)
  .use(pinia)
  .use(i18n)
  .component("fai", FontAwesomeIcon)
  .component("WindowNav", WindowNav)
  .component('country-flag', CountryFlag)
  .component('v-otp-input', VOtpInput)
  .component('Update', Update)
  .mount("#app")
