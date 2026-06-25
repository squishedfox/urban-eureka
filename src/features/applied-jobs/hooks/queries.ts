import { useCallback, useEffect, useRef, useState } from "react";
import { JobListing } from "@app/features/applied-jobs/types";
import { IpcRendererEvent } from "electron";

export const useGetJobListings = () => {
  const [error, setError] = useState<unknown | null>(null);
  const [jobs, setJobs] = useState<{ [id: string]: JobListing }>({});
  const [state, setState] = useState<
    "fetching" | "error" | "success" | "pending"
  >("pending");

  const addJobSuccess = useCallback(
    (_: IpcRendererEvent, res: { id: string }) => {
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
    },
    [],
  );

  const addJobFailed = useCallback((_: IpcRendererEvent, error: unknown) => {
    console.error(error);
  }, []);

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
    if (didFetchRef.current) {
      return;
    }
    if (state === "pending") {
      didFetchRef.current = true;
      getJobs();

      window.ipcRenderer.on("job-listing-add-success", addJobSuccess);
      window.ipcRenderer.on("job-listing-add-failed", addJobFailed);

      return () => {
        window.ipcRenderer.off("job-listing-add-success", addJobSuccess);
        window.ipcRenderer.off("job-listing-add-failed", addJobFailed);
      };
    }
  }, [state, getJobs, addJobSuccess, addJobFailed]);

  return {
    state,
    error,
    jobs,
  };
};
