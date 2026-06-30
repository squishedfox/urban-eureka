import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import { HomeView, ResumeBuilderView, AppliedJobs, About } from "./views";
import { Layout } from "./routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" index element={<HomeView />} />
          <Route path="/resume-builder" element={<ResumeBuilderView />} />
          <Route path="/jobs" element={<AppliedJobs />}>
          </Route>
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>,
);

// Use contextBridge
window.ipcRenderer.on("main-process-message", (_event, message) => {
  console.log(message);
});
