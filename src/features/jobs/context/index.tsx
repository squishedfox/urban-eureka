import { createContext, PropsWithChildren, useCallback, useContext } from "react";
import { type JobListing } from "../types";
import { useGetJobs } from "../hooks";

interface JobListContextType  {
  addJob(): void;
  removeJob(id: string): void;
  updateJob(id: string, listing: JobListing): void;
  getJobs(): {
    state: "fetching" | "error" | "success" | "pending"
    jobs: JobListing[];
    error: unknown;
  }
}

const JobListingContext = createContext<JobListContextType>({
    /**
     * Adds a new job listing to be filled out
     */
    addJob(): void {
        throw new Error("addJob Function not implemented.");
    },
    removeJob(_: string): void {
        throw new Error("removeJob Function not implemented.");
    },
    updateJob(_1: string, _2: JobListing): void {
        throw new Error("updateJob Function not implemented.");
    },
    getJobs(): {
        state: "fetching" | "error" | "success" | "pending",
        error: unknown,
        jobs: JobListing[],
    } {
        throw new Error("getJobs Function not implemented.");
    }
});

export const JobListingProvider = ({ children }: PropsWithChildren<unknown>) => {

  const updateJob = useCallback((id: string, listing: JobListing) => {
    console.log("Updating job", id, "to", listing);
  }, []);

  const removeJob = useCallback((id: string) => {
    console.debug("removing job", id);
  }, []);

  const addJob = useCallback(() => {
    console.debug("Adding a job");
  }, []);

  return (<JobListingContext.Provider value={{
    addJob,
    updateJob,
    removeJob,
    getJobs: useGetJobs,
  }}>
    {children}
  </JobListingContext.Provider>)
}

export const useJobListings = () => useContext(JobListingContext);

