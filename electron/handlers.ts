import { app } from "electron";
import path from "node:path";
import fs from "node:fs";
import { faker } from "@faker-js/faker";

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

export const getJobs = () => {
  const today = new Date();
  const appliedJobs = [];
  for (let i = 0; i < 10; ++i) {
    appliedJobs.push({
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
    });
  }
  return appliedJobs;
};
