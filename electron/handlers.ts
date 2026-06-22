import { app } from "electron";
import path from "node:path";
import fs from "node:fs";

export const saveResumeHandler = (_: unknown, data: unknown) => {
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

export const getJobs = (_: unknown, data: unknown) => {
  console.log("Getting Jobs", data);
  return [];
};
