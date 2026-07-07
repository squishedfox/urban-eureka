import {
  BuildingIcon,
  CalendarIcon,
  CoinsIcon,
  ErrorBoundary,
  PersonCircleExclamationIcon,
} from "@app/components";

import { useGetJobListings } from "../hooks";

export interface JobListingProps {
  className?: string;
  jobListingId: string;
}

const JobListing = ({ jobListingId, className }: JobListingProps) => {
  const { state, jobs = {}, error } = useGetJobListings();

  if (["pending", "fetching"].includes(state)) {
    return <p>Loading...</p>;
  }
  if (state === "error") {
    return <pre>{JSON.stringify(error)}</pre>;
  }

  const {
    companyName,
    companyLink,
    applicationLink,
    dateApplied,
    title,
    salary,
    description,
  } = jobs[jobListingId];

  return (
    <div className={className}>
      <h1 className="inline-flex items-center w-full gap-x-1">
        <BuildingIcon size="sm" /> <strong>Company Name:</strong> {companyName}
      </h1>
      <p className="inline-flex items-center w-full gap-x-1">
        <strong>Company Link:</strong> {companyLink ?? "<empty>"}
      </p>
      <p className="inline-flex items-center w-full gap-x-1">
        <strong>Application Link: </strong>
        {applicationLink ?? "none"}
      </p>
      <p className="inline-flex items-center w-full gap-x-1">
        <CalendarIcon size="sm" /> <strong>Date Applied:</strong>{" "}
        {dateApplied ?? "<empty>"}
      </p>
      <p className="inline-flex items-center w-full gap-x-1">
        <PersonCircleExclamationIcon size="sm" /> <strong>Title:</strong>{" "}
        {title ?? "<empty>"}
      </p>
      <p className="inline-flex items-center w-full gap-x-1">
        <CoinsIcon size="sm" />
        <strong>Salary:</strong>{" "}
        {salary ? Intl.NumberFormat().format(salary) : "<empty>"}
      </p>
      <p className="inline-flex items-center w-full gap-x-1">
        <strong>Description</strong>
      </p>
      <p>{description ?? "<empty>"}</p>
    </div>
  );
};

const ErrorWrapper = (props: JobListingProps) => (
  <ErrorBoundary>
    <JobListing {...props} />
  </ErrorBoundary>
);

export default ErrorWrapper;
