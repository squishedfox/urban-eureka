/* eslint-disable react/display-name */
import { ErrorBoundary } from "@app/components";
import { classes } from "@app/tokens";
import { JobListing } from "@core/types";
import clsx from "clsx";
import { ChangeEvent, useCallback, useId } from "react";

import { useGetJobListings } from "../hooks";

export interface JobListingSelectProps {
  onChange(selected: [string, JobListing]): void;
}
// eslint-disable-next-line react-refresh/only-export-components
const JobListingSelect = ({ onChange }: JobListingSelectProps) => {
  const { state, jobs = {} } = useGetJobListings();
  const id = useId();

  const changeHandler = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const jobListingId = event.currentTarget.value;
      const jobListing = jobs[jobListingId];
      onChange([jobListingId, jobListing]);
    },
    [jobs, onChange],
  );

  return (
    <div className={classes.inputGroup}>
      <p>
        Select a job from the drop down to get started. This will help you
        refine your CSV to one specific requirement and yield better results
      </p>
      <label className={classes.label} htmlFor={id}>
        Target Job
      </label>
      <select
        id={id}
        disabled={state !== "success"}
        className={clsx(classes.input, "bg-white")}
        onChange={changeHandler}
      >
        <option value="" disabled hidden>
          Select a target job...
        </option>
        {Object.keys(jobs).map((jobId) => (
          <option key={jobId} value={jobId}>
            {jobs[jobId].companyName}
          </option>
        ))}
      </select>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default (props: JobListingSelectProps) => (
  <ErrorBoundary>
    <JobListingSelect {...props} />
  </ErrorBoundary>
);
