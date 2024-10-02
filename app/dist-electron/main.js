import { ipcMain, app, BrowserWindow, nativeImage } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "fs";
function init(win2) {
  ipcMain.on("read_media", async (e, path2) => {
    fs.readdir(path2, (err, files) => {
      if (err) console.error(err);
      else win2.webContents.send("read_media", { path: path2, files });
    });
  });
}
createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "velora-smalllogo.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
      defaultFontFamily: {
        standard: "Poppins"
      },
      nodeIntegration: true,
      sandbox: false
    },
    frame: false,
    title: "Velora",
    fullscreen: true
  });
  win.webContents.on("did-finish-load", () => {
    app.on("browser-window-focus", () => {
      win == null ? void 0 : win.webContents.send("windowActive");
    });
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
  win.setMenuBarVisibility(false);
  win.setOverlayIcon(nativeImage.createFromPath(path.join(process.env.VITE_PUBLIC, "velora-smalllogo.png")), "Velora");
  win.webContents.openDevTools({ mode: "detach" });
  app.setUserTasks([
    {
      program: process.execPath,
      arguments: "--new-window",
      iconPath: process.execPath,
      iconIndex: 0,
      title: "New Window",
      description: "Create a new window"
    }
  ]);
  init(win);
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(createWindow);
ipcMain.on("manualMinimize", async () => {
  win == null ? void 0 : win.minimize();
});
ipcMain.on("manualMaximize", async () => {
  win == null ? void 0 : win.maximize();
});
ipcMain.on("manualClose", async () => {
  app.quit();
});
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
