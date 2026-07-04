import { useEventState } from "@app/hooks";
import { AppEventName } from "@core/events";
import { JobListing } from "@core/types";
import { useCallback, useEffect, useState } from "react";

export const useAddAppliedJob = () => {
  const [error, setError] = useState<unknown | null>(null);
  const [state, setState] = useEventState();

  const addJobListing = useCallback((listing: JobListing) => {
    window.ipcRenderer.addJobListing(listing);
    setState("fetching");
    setError(null);
  }, [setState]);

  const addSuccess = useCallback(() => {
    setState("success");
    setError(null);
  }, [setState]);

  const addFailed = useCallback((res: { error: Error }) => {
    setError(res.error);
    setState("error");
  }, [setState]);

  useEffect(() => {
    const unsubscriable = [
      window.ipcRenderer.subscribe(
        AppEventName.AddJobListingSuccess,
        addSuccess,
      ),
      window.ipcRenderer.subscribe(AppEventName.AddJobListingFailed, addFailed),
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
  const [eventState, setEventState] = useEventState();

  const updateJobListing = useCallback((id: string, listing: JobListing) => {
    window.ipcRenderer.send(AppEventName.UpdateJobListing, id, listing);
  }, []);

  const updateSuccess = useCallback((...args: unknown[]) => {
    console.debug("updated args=", args);
    setEventState("success");
  }, [setEventState]);

  const updateFailed = useCallback((...args: unknown[]) => {
    console.debug("updated failed. args=", args);
    setError(new Error("some failure message"));
    setEventState("error");
  }, [setEventState]);

  useEffect(() => {
    const unsubscribable = [
      window.ipcRenderer.subscribe(
        AppEventName.UpdateJobListingSuccess,
        updateSuccess,
      ),
      window.ipcRenderer.subscribe(
        AppEventName.UpdateJobListingFailed,
        updateFailed,
      ),
    ];

    return () => {
      for (const { unsubscribe } of unsubscribable) {
        unsubscribe();
      }
    };
  }, [updateSuccess, updateFailed]);

  return {
    state: eventState,
    error,
    updateJobListing,
  };
};

export const useRemoveJobListing = () => {
  const [error, setError] = useState<unknown | null>(null);
  const [eventState, setEventState] = useEventState();

  const removeJobListing = useCallback((id: string) => {
    setEventState("fetching");
    setError(null);
    window.ipcRenderer.removeJob(id);
  }, [setEventState]);

  const removeSuccess = useCallback(() => {
    setEventState("success");
    setError(null);
  }, [setEventState]);

  const removeFailed = useCallback((res: { error: Error }) => {
    setError(res.error);
    setEventState("error");
  }, [setEventState]);

  useEffect(() => {
    const unsubscriable = [
      window.ipcRenderer.subscribe(
        AppEventName.RemoveJobListingSuccess,
        removeSuccess,
      ),
      window.ipcRenderer.subscribe(
        AppEventName.RemoveJobListingFailed,
        removeFailed,
      ),
    ];

    return () => {
      for (const { unsubscribe } of unsubscriable) {
        unsubscribe();
      }
    };
  }, [removeFailed, removeSuccess]);

  return {
    state: eventState,
    error,
    removeJobListing,
  };
};
