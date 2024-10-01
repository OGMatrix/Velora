<template>
  <div>
    <h1 class="setup-title">{{ $t("views.setup.theme.title") }}</h1>
    <h1 class="setup-subtitle">{{ $t("views.setup.theme.subtitle") }}</h1>
    <div class="setup-themes">
      <div class="theme">
        <div
          class="theme-display"
          color="base"
          :class="{ active: settingsStore.theme === 'blue' }"
          @click="selectTheme('blue')"
        ></div>
        <p>{{ $t("views.setup.theme.colors.blue") }}</p>
      </div>
      <div class="theme">
        <div
          class="theme-display"
          color="red"
          :class="{ active: settingsStore.theme === 'red' }"
          @click="selectTheme('red')"
        ></div>
        <p>{{ $t("views.setup.theme.colors.red") }}</p>
      </div>
      <div class="theme">
        <div
          class="theme-display"
          color="green"
          :class="{ active: settingsStore.theme === 'green' }"
          @click="selectTheme('green')"
        ></div>
        <p>{{ $t("views.setup.theme.colors.green") }}</p>
      </div>
      <div class="theme">
        <div
          class="theme-display"
          color="purple"
          :class="{ active: settingsStore.theme === 'purple' }"
          @click="selectTheme('purple')"
        ></div>
        <p>{{ $t("views.setup.theme.colors.purple") }}</p>
      </div>
      <div class="theme">
        <div
          class="theme-display"
          color="pink"
          :class="{ active: settingsStore.theme === 'pink' }"
          @click="selectTheme('pink')"
        ></div>
        <p>{{ $t("views.setup.theme.colors.pink") }}</p>
      </div>
      <div class="theme">
        <div
          class="theme-display"
          color="yellow"
          :class="{ active: settingsStore.theme === 'yellow' }"
          @click="selectTheme('yellow')"
        ></div>
        <p>{{ $t("views.setup.theme.colors.yellow") }}</p>
      </div>
      <div class="theme">
        <div
          class="theme-display"
          color="dark-blue"
          :class="{ active: settingsStore.theme === 'dark-blue' }"
          @click="selectTheme('dark-blue')"
        ></div>
        <p>{{ $t("views.setup.theme.colors.dark-blue") }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useSettingsStore } from "../../store/settings";

export default defineComponent({
  name: "SetupTheme",
  setup() {
    const settingsStore = useSettingsStore();

    const selectTheme = (theme: string) => {
      settingsStore.theme = theme;
      document.body.className = theme + "-theme";
    };

    return { settingsStore, selectTheme };
  },
});
</script>

<style scoped>
.setup-title {
  margin-top: 15px;
  text-align: center;
  font-size: 30px;
}

.setup-subtitle {
  text-align: center;
  font-size: 16px;
  margin-top: -15px;
  color: var(--text-secondary) !important;
}

.setup-themes {
    margin-top: 15px;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
}

.theme {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
}

.theme-display {
  /* Define size of the circle */
  width: 100px;
  height: 100px;

  /* Make the div a circle */
  border-radius: 50%;

  /* Optional: Centering the circle for demo purposes */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  outline: 2px solid transparent;
}

.theme-display[color="base"] {
  /* Apply a linear gradient using current background and primary accent */
  background: linear-gradient(-35deg, #1b1d2a 30%, #4da8da 120%);
}

.theme-display[color="red"] {
  /* Apply a linear gradient using current background and primary accent */
  background: linear-gradient(-35deg, #2a1b1d 30%, #da4d4d 120%);
}

.theme-display[color="green"] {
  /* Apply a linear gradient using current background and primary accent */
  background: linear-gradient(-35deg, #1b2a1d 30%, #4dda4d 120%);
}

.theme-display[color="purple"] {
  /* Apply a linear gradient using current background and primary accent */
  background: linear-gradient(-35deg, #2a1b2d 30%, #8b4dda 120%);
}

.theme-display[color="pink"] {
  /* Apply a linear gradient using current background and primary accent */
  background: linear-gradient(-35deg, #2a1b25 30%, #da4db6 120%);
}

.theme-display[color="yellow"] {
  /* Apply a linear gradient using current background and primary accent */
  background: linear-gradient(-35deg, #2a2a1b 30%, #dab74d 120%);
}

.theme-display[color="dark-blue"] {
  /* Apply a linear gradient using current background and primary accent */
  background: linear-gradient(-35deg, #1a2430 30%, #4877da 120%);
}

.theme-display:hover {
  outline: 2px solid var(--secondary-accent);
}

.theme-display.active {
  outline: 2px solid #fff !important;
}
</style>
