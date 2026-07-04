/// <reference types="vite-plugin-electron/electron-env" />

import type { AppEventName } from "@core/events";
import type { JobListing } from "@core/types";

declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * The built directory structure
     *
     * ```tree
     * ├─┬─┬ dist
     * │ │ └── index.html
     * │ │
     * │ ├─┬ dist-electron
     * │ │ ├── main.js
     * │ │ └── preload.js
     * │
     * ```
     */
    APP_ROOT: string;
    /** /dist/ or /public/ */
    VITE_PUBLIC: string;
  }
}

interface SubscribeFunc {
  <T extends any>(
    eventName: AppEventName,
    callback: (args: T) => void | Promise<void>,
  ): { unsubscribe: () => void };
}

// Used in Renderer process, expose in `preload.ts`
interface Window {
  ipcRenderer: import("electron").IpcRenderer & {
    getJobListings(): Promise<{ [id: string]: JobListing }>;
    removeJob(jobId: string): void;
    addJobListing(listing: JobListing);
    subscribe: SubscribeFunc;
  };
}
