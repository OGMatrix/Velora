<template>
    <div class="window-nav" style="-webkit-app-region: drag;">
        <p id="title">Velora</p>
        <div class="nav-buttons">
            <button id="minimize" class="nav-button" @click="minimize()">
                <fai class="icon" :icon="['fa', 'window-minimize']" />
            </button>
            <button id="maximize" class="nav-button" @click="maximize()">
                <fai class="icon" :icon="['fa', 'window-maximize']" />
            </button>
            <button id="close" class="nav-button" @click="close()">
                <fai class="icon" :icon="['fa', 'close']" />
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "WindowNav",
    setup() {
        const ipc = window.ipcRenderer
        const minimize = async() => {
            ipc.send("manualMinimize")
        }
        const maximize = async() => {
            ipc.send("manualMaximize")
        }
        const close = async() => {
            ipc.send("manualClose")
        }
        return {minimize, maximize, close};
    }
})
</script>

<style scoped>
.window-nav {
    background-color: var(--secondary-bg);
    border: 1px solid var(--window-nav-bg);
    height: 35px;
    display: flex;
    padding: 0px 0px 0px 10px;
    align-items: center;
}

.nav-buttons {
    margin-left: auto;
    display: flex;
    height: 100%;
}

.nav-buttons .nav-button {
    background: var(--secondary-bg);
    border: none;
    display: flex;
    align-items: center;
    height: 100%;
    margin: 0;
    justify-content: center;
    aspect-ratio: 1;
    color: #fff;
    transition: background .2s ease;
}

.nav-button .icon {
    font-size: 17px !important;
}

.nav-button:hover {
    transition: .2s ease;
    background: var(--window-nav-bg);
}

.nav-button:active {
    background: var(--window-nav-button-active);
}

:not(.window-nav) {
    -webkit-app-region: no-drag;
}
</style>