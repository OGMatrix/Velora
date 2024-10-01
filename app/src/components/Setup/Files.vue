<template>
  <div class="files-container">
    <h1 class="files-title">Wähle deinen Filmordner aus</h1>
    <div class="files-inputs">
        <input ref="inputDialog" type="file" webkitdirectory="true" directory="" multiple="false" @input="onInput"/>
        <p>oder</p>
        <input ref="input" type="text" placeholder="Schreibe den Pfad manuell" />
        <div class="input-card" v-if="path && files">
            <p>Bitte überprüfe folgendes:</p>
            <p>Es wurden <span>{{ files }}</span> in <span>{{ path }}</span> gefunden</p>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "SetupFiles",
  setup() {
    const inputDialog = ref();
    const path = ref("");
    const files = ref(0);

    const onInput = async(x: any) => {
        const dir: string[] = x.target.files[0].path.split("\\");
        dir.pop()
        path.value = dir.join("\\");

        const filesList: FileList = x.target.files;

        for (let i = 0; i < filesList.length; i++) {
            const item: any = filesList.item(i);
            if (item !== null && item.path) {
                if (item.path.includes(".mkv") || item.path.includes(".mp4")) {
                    files.value += 1;
                }
            }
        }

        // files.value = filesList.filter((x) => x.path.includes(".mkv") || x.path.includes(".mp4")).length;
    }

    return { inputDialog, onInput, path, files };
  },
});
</script>

<style scoped>
.files-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    align-items: center;
}

.files-inputs {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    justify-content: center;
    width: 80%;

}
.input-card {
    margin-top: 30px;
    border-radius: 12px;
    background-color: var(--glass-bg);
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 5px;
    padding: 5px 10px;
    border: 1px solid var(--primary-accent);
    box-shadow: 0 4px 10px var(--shadow-color); /* Light blue shadow */
}

.input-card span {
    border-radius: 6px;
    background-color: var(--glass-bg);
    padding: 2px 5px;
}
</style>