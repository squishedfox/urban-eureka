/// <reference types="vite-plugin-electron/electron-env" />

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

type SubscribableEventNames =
  | "get-jobs-request"
  | "job-listing-add-success"
  | "job-listing-add-failed"
  | "job-listing-remove-success"
  | "job-listing-remove-failed"
  | "job-listing-updated-success"
  | "job-listing-updated-failed";

interface SubscribeFunc {
  <T extends any>(
    eventName: SubscribableEventNames,
    callback: (args: T) => void | Promise<void>,
  ): { unsubscribe: () => void };
}

// Used in Renderer process, expose in `preload.ts`
interface Window {
  ipcRenderer: import("electron").IpcRenderer & {
    getJobListings(): Promise<{ [id: string]: JobListing }>;
    subscribe: SubscribeFunc;
  };
}
