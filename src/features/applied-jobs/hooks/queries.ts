import { useCallback, useEffect, useRef, useState } from "react";
import { JobListing } from "@app/features/applied-jobs/types";
import { useEventState } from "@app/hooks";

export const useGetJobListings = () => {
  const didFetchRef = useRef(false);
  const [error, setError] = useState<unknown | null>(null);
  const [jobs, setJobs] = useState<{ [id: string]: JobListing }>({});
  const [state, setState] = useEventState();

  const addJobSuccess = useCallback((res: { id: string }) => {
    setState("fetching");
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
      },
    }));
    setState("success");
  }, []);

  const addJobFailed = useCallback((res: { error: Error }) => {
    console.error(res.error);
  }, []);

  const getJobs = useCallback(async () => {
    try {
      setState("fetching");
      const res = await window.ipcRenderer.getJobListings();
      setJobs(res);
      setError(null);
      setState("success");
    } catch (err: unknown) {
      setState("error");
      setError(err);
      setJobs({});
    }
  }, []);

  useEffect(() => {
    // you should make sure these are setup first before renders
    // start taking over
    const unsubscriable = [
      window.ipcRenderer.subscribe("job-listing-add-success", addJobSuccess),
      window.ipcRenderer.subscribe("job-listing-add-failed", addJobFailed),
    ];
    return () => {
      for (const { unsubscribe } of unsubscriable) {
        unsubscribe();
      }
    };
  }, [addJobSuccess, addJobFailed]);

  useEffect(() => {
    if (!didFetchRef.current) {
      getJobs();
    }

    didFetchRef.current = true; // you should register ASAP this to avoid race conditions
  }, [getJobs]);

  return {
    state,
    error,
    jobs,
  };
};
