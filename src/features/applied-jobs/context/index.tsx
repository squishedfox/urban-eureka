import { createContext, PropsWithChildren, useContext } from "react";
import {
  useGetJobs,
  useRemoveJobListing,
  useUpdateJobListing,
  addAppliedJob,
} from "@app/features/applied-jobs/hooks";
import { JobListing } from "@app/features/applied-jobs/types";

export interface JobListingContextType {
  addJobListing(): void;
  removeJobListing(id: string): void;
  updateJobListing(id: string, payload: JobListing): void;
  getJobListings(): {
    state: "pending" | "fetching" | "success" | "error";
    error: unknown | null;
    jobs: { [id: string]: JobListing };
  };
}

const AppliedJobsContext = createContext<JobListingContextType>({
  getJobListings() {
    throw new Error("getJobs function not implemented");
  },
  addJobListing(): void {
    throw new Error("addAppliedJob function not implemented.");
  },
  removeJobListing(_: string): void {
    throw new Error("removeAppliedJob function not implemented.");
  },
  updateJobListing(_1: string, _2: JobListing): void {
    throw new Error("updateAppliedJob function not implemented.");
  },
});

export const JobListingProvider = ({ children }: PropsWithChildren<{}>) => {
  return (
    <AppliedJobsContext.Provider
      value={{
        addJobListing: addAppliedJob,
        getJobListings: useGetJobs,
        removeJobListing: useRemoveJobListing,
        updateJobListing: useUpdateJobListing,
      }}
    >
      {children}
    </AppliedJobsContext.Provider>
  );
};

export const useAppliedJobsContext = () => useContext(AppliedJobsContext);
