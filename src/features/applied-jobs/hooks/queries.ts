import { useCallback, useEffect, useRef, useState } from "react";
import { JobListing } from "@app/features/applied-jobs/types";

export const useGetJobs = () => {
  const [error, setError] = useState<unknown | null>(null);
  const [jobs, setJobs] = useState<{ [id: string]: JobListing }>({});
  const [state, setState] = useState<
    "fetching" | "error" | "success" | "pending"
  >("pending");

  const didFetchRef = useRef(false);
  const getJobs = useCallback(async () => {
    try {
      setState("fetching");
      const res = await window.ipcRenderer.invoke("get-jobs-request");
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
    if (didFetchRef.current) return;
    if (state === "pending") {
      didFetchRef.current = true;
      getJobs();
    }
  }, [state, getJobs]);

  return {
    state,
    error,
    jobs,
  };
};
