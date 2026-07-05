"use strict";
const electron = require("electron");
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
electron.contextBridge.exposeInMainWorld("ipcRenderer", {
  on(...args) {
    const [channel, listener] = args;
    return electron.ipcRenderer.on(
      channel,
      (event, ...args2) => listener(event, ...args2)
    );
  },
  off(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.off(channel, ...omit);
  },
  send(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.send(channel, ...omit);
  },
  invoke(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.invoke(channel, ...omit);
  },
  subscribe(eventName, callback) {
    console.debug(`${eventName} subscribed`);
    const func = (_event, res) => {
      callback(res);
    };
    electron.ipcRenderer.on(eventName, func);
    return {
      unsubscribe: () => {
        console.debug(`${eventName} unsubscribed`);
        electron.ipcRenderer.off(eventName, func);
      }
    };
  },
  getJobListings() {
    return electron.ipcRenderer.invoke(AppEventName.GetJobs, null);
  },
  removeJob(jobId) {
    electron.ipcRenderer.send(AppEventName.RemoveJobListing, { id: jobId });
  },
  addJobListing(listing) {
    electron.ipcRenderer.send(AppEventName.AddJobListing, listing);
  }
});
