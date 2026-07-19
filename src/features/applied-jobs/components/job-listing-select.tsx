/* eslint-disable react/display-name */
import { ErrorBoundary } from "@app/components";
import { classes } from "@app/tokens";
import { JobListing } from "@core/types";
import clsx from "clsx";
import { ChangeEvent, useCallback, useId, useState } from "react";
import { useTranslation } from "react-i18next";

import { useGetJobListings } from "../hooks";

export interface JobListingSelectProps {
  onChange(selected: [string, JobListing]): void;
}
// eslint-disable-next-line react-refresh/only-export-components
const JobListingSelect = ({ onChange }: JobListingSelectProps) => {
  const [selectedJob, setSelectedJob] = useState("");
  const { state, jobs = {} } = useGetJobListings();
  const id = useId();
  const { t } = useTranslation();

  const changeHandler = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const jobListingId = event.currentTarget.value;
      const jobListing = jobs[jobListingId];
      setSelectedJob(jobListingId);
      onChange([jobListingId, jobListing]);
    },
    [jobs, onChange],
  );

  return (
    <div className={classes.forms.inputGroup.default}>
      <p>
        Select a job from the drop down to get started. This will help you
        refine your CSV to one specific requirement and yield better results
      </p>
      <label className={classes.forms.label.default} htmlFor={id}>
        Target Job
        <select
          value={selectedJob}
          id={id}
          disabled={state !== "success"}
          className={clsx(classes.forms.input.default, "bg-white")}
          onChange={changeHandler}
        >
          <option value="" disabled hidden>
            {t("selectJob")}...
          </option>
          {Object.keys(jobs).map((jobId) => (
            <option key={jobId} value={jobId}>
              {jobs[jobId].companyName}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default (props: JobListingSelectProps) => (
  <ErrorBoundary>
    <JobListingSelect {...props} />
  </ErrorBoundary>
);
