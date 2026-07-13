import React from "react";
import ReactDOM from "react-dom/client";

import { Preview } from "./features";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Preview />
  </React.StrictMode>,
);

// Use contextBridge
window.ipcRenderer.on(
  "main-process-message",
  (_event: unknown, message: unknown) => {
    console.log(message);
  },
);
