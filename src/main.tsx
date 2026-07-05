import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";

import { Layout } from "./routes";
import {
  HomeView,
  ResumeBuilderView,
  AppliedJobs,
  About,
  NewJobListingView,
} from "./views";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" index element={<HomeView />} />
          <Route path="/resume-builder" element={<ResumeBuilderView />} />
          <Route path="/jobs">
            <Route index element={<AppliedJobs />} />
            <Route path="new" element={<NewJobListingView />} />
          </Route>
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>,
);

// Use contextBridge
window.ipcRenderer.on(
  "main-process-message",
  (_event: unknown, message: unknown) => {
    console.log(message);
  },
);
