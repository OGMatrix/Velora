import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useSettingsStore = defineStore('Store', () => {
    const theme = ref('blue');
    const themeSetupDone = ref(false);

    return {
        theme,
        themeSetupDone
    }
})