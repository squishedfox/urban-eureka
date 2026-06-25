import { createContext, PropsWithChildren } from "react";
import {
  useGetJobs,
  useRemoveJobListing,
  useUpdateJobListing,
  addAppliedJob,
} from "@app/features/applied-jobs/hooks";
import { JobListing } from "@app/features/applied-jobs/types";

export interface AppliedJobsContextType {
  addAppliedJob(): void;
  removeAppliedJob(id: string): void;
  updateAppliedJob(id: string, payload: JobListing): void;
  getJobs(): {
    state: "pending" | "fetching" | "success" | "error";
    error: unknown | null;
    jobs: { [id: string]: JobListing };
  };
}

const AppliedJobsContext = createContext<AppliedJobsContextType>({
  getJobs() {
    throw new Error("getJobs function not implemented");
  },
  addAppliedJob(): void {
    throw new Error("addAppliedJob function not implemented.");
  },
  removeAppliedJob(_: string): void {
    throw new Error("removeAppliedJob function not implemented.");
  },
  updateAppliedJob(_1: string, _2: JobListing): void {
    throw new Error("updateAppliedJob function not implemented.");
  },
});

export const AppliedJobsProvider = ({ children }: PropsWithChildren<{}>) => {
  return (
    <AppliedJobsContext.Provider
      value={{
        addAppliedJob,
        getJobs: useGetJobs,
        removeAppliedJob: useRemoveJobListing,
        updateAppliedJob: useUpdateJobListing,
      }}
    >
      {children}
    </AppliedJobsContext.Provider>
  );
};
