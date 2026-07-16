import { useEventState } from "@app/hooks";
import { AppEventName } from "@core/events";
import { JobListing } from "@core/types";
import { useCallback, useEffect, useRef, useState } from "react";

export const useGetJobListings = () => {
  const didFetchRef = useRef(false);
  const [error, setError] = useState<unknown | null>(null);
  const [jobs, setJobs] = useState<{ [id: string]: JobListing }>({});
  const [eventState, setEventState] = useEventState();

  const addJobSuccess = useCallback(
    (res: { id: string }) => {
      setEventState("fetching");
      setError(null);
      setJobs((prev) => ({
        ...prev,
        [res.id]: {
          companyLink: "",
          companyName: "",
          salary: 0,
          applicationLink: "",
          dateApplied: "",
          description: "",
          notes: "",
          title: "",
          requirements: "",
          qualifications: "",
        },
      }));
      setEventState("success");
    },
    [setEventState],
  );

  const removeJobSuccess = useCallback(
    (res: { id: string }) => {
      setEventState("fetching");
      setError(null);
      setJobs((prev) =>
        Object.entries(prev).reduce((acc, [id, value]) => {
          if (id === res.id) {
            return acc;
          }
          Object.defineProperty(acc, id, {
            value: value,
            configurable: true,
            writable: true,
            enumerable: true,
          });
          return acc;
        }, {}),
      );
      setEventState("success");
    },
    [setEventState],
  );

  const addJobFailed = useCallback((res: { error: Error }) => {
    console.error(res.error);
  }, []);

  const getJobs = useCallback(async () => {
    try {
      setEventState("fetching");
      const res = await window.ipcRenderer.getJobListings();
      setJobs(res);
      setError(null);
      setEventState("success");
    } catch (err: unknown) {
      setEventState("error");
      setError(err);
      setJobs({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // you should make sure these are setup first before renders
    // start taking over
    const unsubscriable = [
      window.ipcRenderer.subscribe(
        AppEventName.AddJobListingSuccess,
        addJobSuccess,
      ),
      window.ipcRenderer.subscribe(
        AppEventName.AddJobListingFailed,
        addJobFailed,
      ),
      window.ipcRenderer.subscribe(
        AppEventName.RemoveJobListingSuccess,
        removeJobSuccess,
      ),
    ];
    return () => {
      for (const { unsubscribe } of unsubscriable) {
        unsubscribe();
      }
    };
  }, [addJobSuccess, addJobFailed, removeJobSuccess]);

  useEffect(() => {
    if (!didFetchRef.current) {
      getJobs();
      didFetchRef.current = true; // you should register ASAP this to avoid race conditions
    }
  }, [getJobs]);

  return {
    state: eventState,
    error,
    jobs,
  };
};
