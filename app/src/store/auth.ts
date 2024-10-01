import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useAuthStore = defineStore('Auth', () => {
    const token = ref("");
    const auth = ref();

    token.value = window.localStorage.getItem("token") as string;

    return {
        token,
        auth,
        open
    }
})