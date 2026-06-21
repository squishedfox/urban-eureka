import { app, ipcMain, Menu, BrowserWindow } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";
createRequire(import.meta.url);
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname$1, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  win = new BrowserWindow({
    autoHideMenuBar: true,
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname$1, "preload.mjs")
    }
  });
  win.setMenuBarVisibility(false);
  win.setMenu(null);
  win.removeMenu();
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
    win == null ? void 0 : win.setMenuBarVisibility(false);
    win == null ? void 0 : win.setMenu(null);
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.whenReady().then(() => {
  ipcMain.on("resume-builder:save", (_, data) => {
    const appDataPath = app.getPath("appData");
    const jsonPayload = JSON.stringify(data);
    if (!fs.existsSync(path.join(appDataPath, "./urban-eureka"))) {
      fs.mkdirSync(path.join(appDataPath, "./urban-eureka"));
    }
    fs.writeFile(
      path.join(appDataPath, "./urban-eureka", "resume.json"),
      jsonPayload,
      "utf8",
      (err) => {
        console.error(err);
      }
    );
  });
  Menu.setApplicationMenu(null);
  app.setAboutPanelOptions({ applicationName: " " });
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
