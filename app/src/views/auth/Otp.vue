<template>
  <div class="otp-container">
    <div class="otp-item glass-panel">
      <fai class="otp-icon" :icon="['fa', 'paper-plane']" />
      <h1 class="otp-title">{{ $t("views.otp.title") }}</h1>
      <h1 class="otp-subtitle">{{ $t("views.otp.subtitle") }}</h1>
      <div class="otp-inputs">
        <v-otp-input
          ref="otpInput"
          :separator="''"
          :class="invalid ? 'invalid' : 'valid'"
          input-classes="otp-input"
          :num-inputs="6"
          :should-auto-focus="true"
          input-type="numeric"
          @on-complete="handleOnComplete"
        />
      </div>
      <div class="otp-buttons">
        <a class="button resend" :class="{'disabled': timeLeft !== null}" @click="timeLeft !== null ? '' : sendMail()">{{
            timeLeft !== null ? `${$t('auth.otp.resend')} in ${timeLeft}` : $t('auth.otp.resend')
          }}</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { sendOtp, verifyOtp } from "../../services/auth/api";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "Otp",
  setup() {
    const ipc = window.ipcRenderer;
    const clipboard = window.clipboard;
    const route = useRoute();
    const invalid = ref(false);
    let startedAt = new Date();
    const timeLeft = ref();
    const otpInput = ref();

    const isNumber = (val: any) => typeof val === "number" && val === val;

    ipc.on("windowActive", async () => {
      const text = clipboard.readText();
      if (text.length == 6 && isNumber(parseInt(text))) {
        otpInput.value?.fillInput(text);
      } 
    });
    ipc.removeAllListeners("windowActive");

    const updateTime = async () => {
      const timeDiff = Math.abs(startedAt.getTime() - new Date().getTime());

      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      timeLeft.value = `${hours > 0 ? `${hours}h ` : ``}${
        minutes > 0 ? `${minutes}m ` : ``
      }${seconds}s`;
      if (minutes == 0 && seconds == 0) {
        timeLeft.value = null;
      } else setTimeout(async () => updateTime(), 1000);
    };

    const sendMail = async () => {
      await sendOtp(route.query.email as string);
      startedAt = new Date(new Date().setSeconds(new Date().getSeconds() + 120));
      await updateTime();
    };

    (async () => {
        await sendMail();
    })();

    const handleOnComplete = async (value: string) => {
      const res = await verifyOtp(route.query.email as string, value);
      if (res) {
        window.location.href = '/home'
      }
    };
    return { handleOnComplete, invalid, otpInput, timeLeft, sendMail };
  },
});
</script>

<style>
.otp-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.otp-item {
  padding: 10px;
  display: flex;
  align-items: center;
  background-color: var(--glass-bg);
  border-radius: 12px;
  width: 600px;
  flex-direction: column;
  gap: 10px;
}

.otp-icon {
  font-size: 60px !important;
  color: var(--primary-accent);
}

.otp-title {
  margin-top: 15px;
  text-align: center;
  font-size: 30px;
}

.otp-subtitle {
  text-align: center;
  font-size: 16px;
  margin-top: -15px;
  color: var(--text-secondary) !important;
}

.otp-img {
  width: 80%;
  height: 230px;
}

.otp-inputs {
  display: flex;
  padding: 10px 20px;
  border-radius: 12px;
  flex-direction: column;
  gap: 10px;
}

.otp-buttons {
  display: flex;
  padding: 10px 20px;
  border-radius: 12px;
  flex-direction: column;
  gap: 10px;
  width: 85%;
}

.otp-button {
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: column;
  padding-top: 20px;
  padding-bottom: 30px;
}

.otp-button .button {
  width: 80% !important;
}

.otp-input.invalid {
  border: 2px solid #ffb3b3 !important;
}

.otp-input.valid {
  border: 2px solid #9decb7 !important;
}

.otp-input {
  width: 60px;
  height: 60px;
  font-size: 30px;
  margin-left: 2px;
  color: var(--text-color);
  font-family: "Poppins";
  margin-right: 2px;
  border-radius: 12px;
  background-color: var(--glass-bg);
  border: 2px solid var(--primary-accent);
  text-align: center;
}

.otp-input:focus-visible {
  border: 2px solid var(--secondary-accent) !important;
  outline: none !important;
}

.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
