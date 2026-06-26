"use strict";
const electron = require("electron");
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
      console.debug("called", res);
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
  // You can expose other APTs you need here.
  // ...
  getJobListings() {
    return electron.ipcRenderer.invoke("get-jobs-request", null);
  }
});
