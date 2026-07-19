import i18next from "i18next";
import React from "react";
import ReactDOM from "react-dom/client";
import { initReactI18next } from "react-i18next";
import "i18n";
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

i18next.use(initReactI18next).init({
  debug: true,
  lng: "en-US",
  fallbackLng: "en-US",
  react: {},
});

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
