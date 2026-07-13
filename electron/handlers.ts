import fs from "node:fs";
import path from "node:path";

import { AppEventName } from "@core/events";
import { Resume, type JobListing } from "@core/types";
import { faker } from "@faker-js/faker";
import { app, ipcMain, type IpcMainInvokeEvent } from "electron";
import { BrowserWindow } from "electron/main";
import { ulid } from "ulid";

// this is a test object and is not concurrent safe
let globalJobListings: { [id: string]: JobListing } = {};
let previewWindow: BrowserWindow | null = null;
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const RENDERER_DIST = path.join(__dirname, "../renderer");

const createFakeJobListings = () => {
  const today = new Date();
  const jobListings = {};
  for (let i = 0; i < 10; ++i) {
    const jobListing = {
      companyName: faker.company.name(),
      dateApplied: faker.date
        .between({
          from: new Date(today.setMonth(today.getMonth() - 6)),
          to: new Date(),
        })
        .toDateString(),
      title: faker.person.jobTitle(),
      salary: faker.number.int({
        min: 50000,
        max: 200000,
      }),
      applicationLink: faker.internet.url(),
    };
    Object.defineProperty(jobListings, ulid(), {
      value: jobListing,
      writable: true,
      enumerable: true,
      configurable: true,
    });
  }
  return jobListings;
};

let isRegistered = false;
export const registerHandlers = () => {
  if (isRegistered) {
    return;
  }
  isRegistered = true;
  globalJobListings = createFakeJobListings();

  // async (invoke) handlers
  ipcMain.handle(AppEventName.SaveResume, saveResumeHandler);
  ipcMain.handle(AppEventName.GetJobs, getJobListings);

  // pub/sub handlers
  ipcMain.on(AppEventName.AddJobListing, addJobListingHandler);
  ipcMain.on(AppEventName.RemoveJobListing, removeJobListingHandler);

  ipcMain.on(AppEventName.ShowPreviewWindow, showPreviewWindow);
};

export const removeHandlers = () => {
  // ipcMain.handle
  ipcMain.removeHandler(AppEventName.SaveResume);
  ipcMain.removeHandler(AppEventName.GetJobs);

  // async handlers
  ipcMain.off(AppEventName.AddJobListing, addJobListingHandler);
  ipcMain.off(AppEventName.RemoveJobListing, removeJobListingHandler);
  ipcMain.off(AppEventName.ShowPreviewWindow, showPreviewWindow);
};

const addJobListingHandler = (event: IpcMainInvokeEvent, data: JobListing) => {
  const id = ulid();
  Object.defineProperty(globalJobListings, id, {
    value: data,
    configurable: true,
    enumerable: true,
    writable: true,
  });
  event.sender.send(AppEventName.AddJobListingSuccess, {
    id: id,
  });
};

const removeJobListingHandler = (
  event: IpcMainInvokeEvent,
  req: { id: string },
) => {
  delete globalJobListings[req.id];
  event.sender.send(AppEventName.RemoveJobListingSuccess, {
    id: req.id,
  });
};

const saveResumeHandler = (_: IpcMainInvokeEvent, data: Resume) => {
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
    },
  );
};

const showPreviewWindow = (_: IpcMainInvokeEvent, resume: Resume) => {
  if (previewWindow) {
    return;
  }
  previewWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  if (VITE_DEV_SERVER_URL) {
    previewWindow.loadURL(`${VITE_DEV_SERVER_URL}/preview.html`);
  } else {
    previewWindow.loadFile(path.join(RENDERER_DIST, "preview.html"));
  }

  // Pass data to the preview window once it's ready
  previewWindow.webContents.on("did-finish-load", () => {
    previewWindow!.webContents.send(AppEventName.LoadPreview, resume);
  });

  previewWindow.on("closed", () => {
    previewWindow = null;
  });
};

const getJobListings = () => globalJobListings;
