import { useCallback, useEffect, useRef, useState } from "react";
import { JobListing } from "../types";
import { IpcRendererEvent } from "electron/main";

export const useAddAppliedJob = () => {
  const [error, setError] = useState<unknown | null>(null);
  const [state, setState] = useState<
    "fetching" | "error" | "success" | "pending"
  >("pending");
  const [appliedJobId, setAppliedJobId] = useState<string | null>();

  const addJobListing = useCallback(() => {
    window.ipcRenderer.send("job-listing-add-request");
  }, []);

  const addAppliedJobSuccess = useCallback(
    (_: IpcRendererEvent, newId: string) => {
      setState("fetching");
      setAppliedJobId(newId);
      setState("success");
      setError(null);
    },
    [],
  );

  const addAppliedJobFailed = useCallback(
    (_: IpcRendererEvent, error: unknown) => {
      setError(error);
      setState("error");
      setAppliedJobId(null);
    },
    [],
  );

  useEffect(() => {
    window.ipcRenderer.on("job-listing-add-success", addAppliedJobSuccess);
    window.ipcRenderer.on("job-listing-add-failed", addAppliedJobFailed);

    return () => {
      window.ipcRenderer.off(
        "job-listing-remove-success",
        addAppliedJobSuccess,
      );
      window.ipcRenderer.off("job-listing-add-failed", addAppliedJobFailed);
    };
  });

  return {
    state,
    error,
    addJobListing,
    appliedJobId,
  };
};

export const useUpdateJobListing = () => {
  const registeredRef = useRef(false);
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
    if (!registeredRef.current) {
      window.ipcRenderer.on(
        "job-listing-remove-success",
        documentUpdateSuccess,
      );
      window.ipcRenderer.on("job-listing-remove-failed", documentUpdateFailed);
    }

    registeredRef.current = true;

    return () => {
      window.ipcRenderer.off(
        "job-listing-remove-success",
        documentUpdateSuccess,
      );
      window.ipcRenderer.off("job-listing-remove-failed", documentUpdateFailed);
    };
  }, []);

  return {
    state,
    error,
    updateJobListing,
  };
};

export const useRemoveJobListing = () => {
  const registeredRef = useRef(false);
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
    if (!registeredRef.current) {
      window.ipcRenderer.on(
        "job-listing-remove-success",
        documentUpdateSuccess,
      );
      window.ipcRenderer.on("job-listing-remove-failed", documentUpdateFailed);
      registeredRef.current = true;
    }
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
