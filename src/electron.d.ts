import type { AppEventName } from "@core/events";
import type { JobListing } from "@core/types";

interface CallbackFunc<T = unknown> {
  (args: T): void | Promise<void>;
}
interface UnsubscribableResult {
  unsubscribe: () => void;
}

declare global {
  interface Window {
    ipcRenderer: {
      on(
        channel: string,
        listener: (
          event: import("electron").IpcRendererEvent,
          ...args: unknown[]
        ) => void,
      ): import("electron").IpcRenderer;
      off(
        channel: string,
        listener: (...args: unknown[]) => void,
      ): import("electron").IpcRenderer;
      send(channel: string, ...args: unknown[]): void;
      invoke<T = unknown>(channel: string, ...args: unknown[]): Promise<T>;
      subscribe<T = unknown>(
        eventName: AppEventName,
        callback: CallbackFunc<T>,
      ): UnsubscribableResult;
      getJobListings(): Promise<{ [id: string]: JobListing }>;
      removeJob(jobId: string): void;
      addJobListing(listing: JobListing): void;
    };
  }
}
