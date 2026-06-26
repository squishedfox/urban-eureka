import { JobListing } from "@app/features/applied-jobs";
import { ipcRenderer, contextBridge, IpcRendererEvent } from "electron";

interface CallbackFunc<T extends any = unknown> {
  (args: T): void | Promise<void>;
}
interface UnsubscribableResult {
  unsubscribe: () => void;
}

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld("ipcRenderer", {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args;
    return ipcRenderer.on(channel, (event, ...args) =>
      listener(event, ...args),
    );
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args;
    return ipcRenderer.off(channel, ...omit);
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args;
    return ipcRenderer.send(channel, ...omit);
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args;
    return ipcRenderer.invoke(channel, ...omit);
  },
  subscribe<T extends any = unknown>(
    eventName: string,
    callback: CallbackFunc<T>,
  ): UnsubscribableResult {
    console.debug(`${eventName} subscribed`);
    const func = (_event: IpcRendererEvent, res: T) => {
      console.debug("called", res);
      callback(res);
    };
    ipcRenderer.on(eventName, func);
    return {
      unsubscribe: () => {
        console.debug(`${eventName} unsubscribed`);
        ipcRenderer.off(eventName, func);
      },
    };
  },
  // You can expose other APTs you need here.
  // ...
  getJobListings(): Promise<{ [id: string]: JobListing }> {
    return ipcRenderer.invoke("get-jobs-request", null);
  },
});
