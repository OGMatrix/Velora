import { BrowserWindow, ipcMain } from "electron";
import fs from "fs";

function init(win: BrowserWindow) {
    ipcMain.on("read_media", async (e: any, path: string) => {
        fs.readdir(path, (err, files) => {
          if (err) console.error(err);
          else win.webContents.send("read_media", {path, files});
        });
      });
}

export {init}