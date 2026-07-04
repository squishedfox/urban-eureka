import { contextBridge, ipcRenderer } from "electron";
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
contextBridge.exposeInMainWorld("ipcRenderer", {
  on(...args) {
    const [channel, listener] = args;
    return ipcRenderer.on(
      channel,
      (event, ...args2) => listener(event, ...args2)
    );
  },
  off(...args) {
    const [channel, ...omit] = args;
    return ipcRenderer.off(channel, ...omit);
  },
  send(...args) {
    const [channel, ...omit] = args;
    return ipcRenderer.send(channel, ...omit);
  },
  invoke(...args) {
    const [channel, ...omit] = args;
    return ipcRenderer.invoke(channel, ...omit);
  },
  subscribe(eventName, callback) {
    console.debug(`${eventName} subscribed`);
    const func = (_event, res) => {
      callback(res);
    };
    ipcRenderer.on(eventName, func);
    return {
      unsubscribe: () => {
        console.debug(`${eventName} unsubscribed`);
        ipcRenderer.off(eventName, func);
      }
    };
  },
  getJobListings() {
    return ipcRenderer.invoke(AppEventName.GetJobs, null);
  },
  removeJob(jobId) {
    ipcRenderer.send(AppEventName.RemoveJobListing, { id: jobId });
  },
  addJobListing(listing) {
    ipcRenderer.send(AppEventName.AddJobListing, listing);
  }
});
