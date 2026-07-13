import { AppEventName } from "@core/events";
import { Resume, type JobListing } from "@core/types";
import { ipcRenderer, contextBridge, type IpcRendererEvent } from "electron";

interface CallbackFunc<T = unknown> {
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
  subscribe<T = unknown>(
    eventName: AppEventName,
    callback: CallbackFunc<T>,
  ): UnsubscribableResult {
    const func = (_event: IpcRendererEvent, res: T) => {
      callback(res);
    };
    ipcRenderer.on(eventName, func);
    return {
      unsubscribe: () => {
        ipcRenderer.off(eventName, func);
      },
    };
  },
  getJobListings(): Promise<{ [id: string]: JobListing }> {
    return ipcRenderer.invoke(AppEventName.GetJobs, null);
  },
  removeJob(jobId: string): void {
    ipcRenderer.send(AppEventName.RemoveJobListing, { id: jobId });
  },
  addJobListing(listing: JobListing): void {
    ipcRenderer.send(AppEventName.AddJobListing, listing);
  },
  showPreview(resume: Resume): void {
    ipcRenderer.send(AppEventName.ShowPreviewWindow, resume);
  },
});
