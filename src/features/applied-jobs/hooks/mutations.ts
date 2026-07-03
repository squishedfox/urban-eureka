import { useCallback, useEffect, useState } from "react";
import { JobListing } from "@core/types";
import { useEventState } from "@app/hooks";

export const useAddAppliedJob = () => {
  const [error, setError] = useState<unknown | null>(null);
  const [state, setState] = useEventState();

  const addJobListing = useCallback((listing: JobListing) => {
    window.ipcRenderer.send("job-listing-add-request", listing);
    setState("fetching");
    setError(null);
  }, []);

  const addSuccess = useCallback(() => {
    setState("success");
    setError(null);
  }, []);

  const addFailed = useCallback((res: { error: Error }) => {
    setError(res.error);
    setState("error");
  }, []);

  useEffect(() => {
    const unsubscriable = [
      window.ipcRenderer.subscribe("job-listing-add-success", addSuccess),
      window.ipcRenderer.subscribe("job-listing-add-failed", addFailed),
    ];

    return () => {
      for (const { unsubscribe } of unsubscriable) {
        unsubscribe();
      }
    };
  }, [addSuccess, addFailed]);

  return {
    state,
    error,
    addJobListing,
  };
};

export const useUpdateJobListing = () => {
  const [error, setError] = useState<unknown | null>(null);
  const [state, setState] = useEventState();

  const updateJobListing = useCallback((id: string, listing: JobListing) => {
    window.ipcRenderer.send("job-listing-remove-request", id, listing);
  }, []);

  const updateSuccess = useCallback((...args: any[]) => {
    console.debug("updated args=", args);
    setState("success");
  }, []);

  const updateFailed = useCallback((...args: any[]) => {
    console.debug("updated failed. args=", args);
    setError(new Error("some failure message"));
    setState("error");
  }, []);

  useEffect(() => {
    const unsubscribable = [
      window.ipcRenderer.subscribe("job-listing-remove-success", updateSuccess),
      window.ipcRenderer.subscribe("job-listing-remove-failed", updateFailed),
    ];

    return () => {
      for (const { unsubscribe } of unsubscribable) {
        unsubscribe();
      }
    };
  }, [updateSuccess, updateFailed]);

  return {
    state,
    error,
    updateJobListing,
  };
};

export const useRemoveJobListing = () => {
  const [error, setError] = useState<unknown | null>(null);
  const [state, setState] = useEventState();

  const removeJobListing = useCallback((id: string) => {
    setState("fetching");
    setError(null);
    window.ipcRenderer.removeJob(id);
  }, []);

  const removeSuccess = useCallback(() => {
    setState("success");
    setError(null);
  }, []);

  const removeFailed = useCallback((res: { error: Error }) => {
    setError(res.error);
    setState("error");
  }, []);

  useEffect(() => {
    const unsubscriable = [
      window.ipcRenderer.subscribe("job-listing-remove-success", removeSuccess),
      window.ipcRenderer.subscribe("job-listing-remove-failed", removeFailed),
    ];

    return () => {
      for (const { unsubscribe } of unsubscriable) {
        unsubscribe();
      }
    };
  }, [removeFailed, removeSuccess]);

  return {
    state,
    error,
    removeJobListing,
  };
};
