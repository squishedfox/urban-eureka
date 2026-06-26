import { app, ipcMain, IpcMainInvokeEvent } from "electron";
import path from "node:path";
import fs from "node:fs";
import { faker } from "@faker-js/faker";
import { ulid } from "ulid";

export const registerHandlers = () => {
  // async (invoke) handlers
  ipcMain.handle("resume-builder:save", saveResumeHandler);
  ipcMain.handle("get-jobs-request", getJobListings);

  // pub/sub handlers
  ipcMain.on("job-listing-add-request", addJobListingHandler);
};

export const removeHandlers = () => {
  // ipcMain.handle
  ipcMain.removeHandler("resume-builder:save");
  ipcMain.removeHandler("get-jobs-request");

  // async handlers
  ipcMain.off("job-listing-add-request", addJobListingHandler);
};

const addJobListingHandler = (event: IpcMainInvokeEvent) => {
  event.sender.send("job-listing-add-success", {
    id: ulid(),
  });
};

const saveResumeHandler = (_: IpcMainInvokeEvent, data: unknown) => {
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

const getJobListings = (_: IpcMainInvokeEvent) => {
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
