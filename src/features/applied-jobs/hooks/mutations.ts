import { useEventState } from "@app/hooks";
import { AppEventName } from "@core/events";
import { JobListing } from "@core/types";
import { useCallback, useEffect, useState } from "react";

export const useAddAppliedJob = () => {
  const [error, setError] = useState<unknown | null>(null);
  const [state, setEventState] = useEventState();

  const addJobListing = useCallback((listing: JobListing) => {
    window.ipcRenderer.addJobListing(listing);
    setEventState("fetching");
    setError(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addSuccess = useCallback(() => {
    setEventState("success");
    setError(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addFailed = useCallback((res: { error: Error }) => {
    setError(res.error);
    setEventState("error");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateFailed = useCallback((...args: unknown[]) => {
    console.debug("updated failed. args=", args);
    setError(new Error("some failure message"));
    setEventState("error");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeSuccess = useCallback(() => {
    setEventState("success");
    setError(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeFailed = useCallback((res: { error: Error }) => {
    setError(res.error);
    setEventState("error");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
