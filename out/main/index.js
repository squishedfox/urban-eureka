import path from "node:path";
import { fileURLToPath } from "node:url";
import { ipcMain, app, BrowserWindow } from "electron";
import fs from "node:fs";
import { faker } from "@faker-js/faker";
import { ulid } from "ulid";
import __cjs_mod__ from "node:module";
const __filename = import.meta.filename;
const __dirname = import.meta.dirname;
const require2 = __cjs_mod__.createRequire(import.meta.url);
var AppEventName = /* @__PURE__ */ ((AppEventName2) => {
  AppEventName2["SaveResume"] = "resume:save";
  AppEventName2["GetJobs"] = "jobs:list";
  AppEventName2["AddJobListing"] = "job-listing:add";
  AppEventName2["RemoveJobListing"] = "job-listing:remove";
  AppEventName2["RemoveJobListingSuccess"] = "job-listing:remove:success";
  AppEventName2["RemoveJobListingFailed"] = "job-listing:remove:failed";
  AppEventName2["AddJobListingSuccess"] = "job-listing:add:success";
  AppEventName2["AddJobListingFailed"] = "job-listing:add:failed";
  AppEventName2["UpdateJobListing"] = "job-listing:update";
  AppEventName2["UpdateJobListingSuccess"] = "job-listing:update:success";
  AppEventName2["UpdateJobListingFailed"] = "job-listing:update:failed";
  return AppEventName2;
})(AppEventName || {});
let globalJobListings = {};
const createFakeJobListings = () => {
  const today = /* @__PURE__ */ new Date();
  const jobListings = {};
  for (let i = 0; i < 10; ++i) {
    const jobListing = {
      companyName: faker.company.name(),
      dateApplied: faker.date.between({
        from: new Date(today.setMonth(today.getMonth() - 6)),
        to: /* @__PURE__ */ new Date()
      }).toDateString(),
      title: faker.person.jobTitle(),
      salary: faker.number.int({
        min: 5e4,
        max: 2e5
      }),
      applicationLink: faker.internet.url()
    };
    Object.defineProperty(jobListings, ulid(), {
      value: jobListing,
      writable: true,
      enumerable: true,
      configurable: true
    });
  }
  return jobListings;
};
let isRegistered = false;
const registerHandlers = () => {
  if (isRegistered) {
    return;
  }
  isRegistered = true;
  globalJobListings = createFakeJobListings();
  ipcMain.handle(AppEventName.SaveResume, saveResumeHandler);
  ipcMain.handle(AppEventName.GetJobs, getJobListings);
  ipcMain.on(AppEventName.AddJobListing, addJobListingHandler);
  ipcMain.on(AppEventName.RemoveJobListing, removeJobListingHandler);
};
const removeHandlers = () => {
  ipcMain.removeHandler(AppEventName.SaveResume);
  ipcMain.removeHandler(AppEventName.GetJobs);
  ipcMain.off(AppEventName.AddJobListing, addJobListingHandler);
  ipcMain.off(AppEventName.RemoveJobListing, removeJobListingHandler);
};
const addJobListingHandler = (event, data) => {
  const id = ulid();
  Object.defineProperty(globalJobListings, id, {
    value: data,
    configurable: true,
    enumerable: true,
    writable: true
  });
  event.sender.send("job-listing-add-success", {
    id
  });
};
const removeJobListingHandler = (event, req) => {
  delete globalJobListings[req.id];
  event.sender.send("job-listing-remove-success", {
    id: req.id
  });
};
const saveResumeHandler = (_, data) => {
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
};
const getJobListings = () => globalJobListings;
var define_process_env_default = {};
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
const VITE_DEV_SERVER_URL = define_process_env_default["VITE_DEV_SERVER_URL"];
const RENDERER_DIST = path.join(__dirname$1, "../renderer");
let win;
function createWindow() {
  win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname$1, "../preload/index.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
    registerHandlers();
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    removeHandlers();
    app.quit();
    win = null;
  }
});
app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
