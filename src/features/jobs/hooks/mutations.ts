import { useCallback, useEffect, useState } from "react";
import { JobListing } from "../types";

export const useUpdateJobListing = () => {
  const [error, setError] = useState<unknown | null>(null);
  const [state, setState] = useState<
    "fetching" | "error" | "success" | "pending"
  >("pending");

  const updateJobListing = useCallback((id: string, listing: JobListing) => {
    window.ipcRenderer.send("job-listing-remove-request", id, listing);
  }, []);

  const documentUpdateSuccess = useCallback((...args: any[]) => {
    console.debug("updated args=", args);
    setState("success");
  }, []);

  const documentUpdateFailed = useCallback((...args: any[]) => {
    console.debug("updated failed. args=", args);
    setError(new Error("some failure message"));
    setState("error");
  }, []);

  useEffect(() => {
    window.ipcRenderer.on("job-listing-remove-success", documentUpdateSuccess);
    window.ipcRenderer.on("job-listing-remove-failed", documentUpdateFailed);

    return () => {
      window.ipcRenderer.off(
        "job-listing-remove-success",
        documentUpdateSuccess,
      );
      window.ipcRenderer.off("job-listing-remove-failed", documentUpdateFailed);
    };
  });

  return {
    state,
    error,
    updateJobListing,
  };
};

export const useRemoveJobListing = () => {
  const [error, setError] = useState<unknown | null>(null);
  const [state, setState] = useState<
    "fetching" | "error" | "success" | "pending"
  >("pending");

  const removeJobListing = useCallback((id: string) => {
    window.ipcRenderer.send("job-listing-remove-request", id);
    setState("fetching");
  }, []);

  const documentUpdateSuccess = useCallback((...args: any[]) => {
    console.debug("updated args=", args);
    setState("success");
  }, []);

  const documentUpdateFailed = useCallback((...args: any[]) => {
    console.debug("remove failed. args=", args);
    setError(new Error("some failure message"));
    setState("error");
  }, []);

  useEffect(() => {
    window.ipcRenderer.on("job-listing-remove-success", documentUpdateSuccess);
    window.ipcRenderer.on("job-listing-remove-failed", documentUpdateFailed);

    return () => {
      window.ipcRenderer.off(
        "job-listing-remove-success",
        documentUpdateSuccess,
      );
      window.ipcRenderer.off("job-listing-remove-failed", documentUpdateFailed);
    };
  });

  return {
    state,
    error,
    removeJobListing,
  };
};
