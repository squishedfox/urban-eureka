import {
  BuildingIcon,
  CalendarIcon,
  CoinsIcon,
  ErrorBoundary,
  PersonCircleExclamationIcon,
} from "@app/components";
import { classes } from "@app/tokens";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { useGetJobListings } from "../hooks";

export interface JobListingProps {
  className?: string;
  jobListingId: string;
}

const JobListing = ({ jobListingId, className }: JobListingProps) => {
  const { state, jobs = {}, error } = useGetJobListings();
  const { t } = useTranslation();

  if (["pending", "fetching"].includes(state)) {
    return <p>{t("loading")}...</p>;
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
    requirements,
    qualifications,
  } = jobs[jobListingId];

  return (
    <div className={clsx("space-y-1", className)}>
      <p className="inline-flex items-center w-full gap-x-1">
        <BuildingIcon size="sm" /> <strong>{t("companyName")}:</strong>{" "}
        {companyName}
      </p>
      <p className="inline-flex items-center w-full gap-x-1">
        <strong>{t("companyLink")}:</strong> {companyLink ?? "<empty>"}
      </p>
      <p className="inline-flex items-center w-full gap-x-1">
        <strong>{t("applicationLink")}: </strong>
        {applicationLink ?? "none"}
      </p>
      <p className="inline-flex items-center w-full gap-x-1">
        <CalendarIcon size="sm" /> <strong>{t("dateApplied")}:</strong>{" "}
        {dateApplied ?? "<empty>"}
      </p>
      <p className="inline-flex items-center w-full gap-x-1">
        <PersonCircleExclamationIcon size="sm" /> <strong>{t("title")}:</strong>{" "}
        {title ?? "<empty>"}
      </p>
      <p className="inline-flex items-center w-full gap-x-1">
        <CoinsIcon size="sm" />
        <strong>{t("salary")}:</strong>{" "}
        {salary ? Intl.NumberFormat().format(salary) : "<empty>"}
      </p>
      <p className="inline-flex items-center gap-x-1">
        <strong>{t("description")}</strong>
      </p>
      <p className={classes.container.nested}>{description ?? "<empty>"}</p>
      <p className="inline-flex items-center gap-x-1">
        <strong>{t("requirements")}</strong>
      </p>
      <p className={classes.container.nested}>{requirements ?? "<empty>"}</p>
      <p className="inline-flex items-center w-full gap-x-1">
        <strong>{t("qualifications")}</strong>
      </p>
      <p className={classes.container.nested}>{qualifications ?? "<empty>"}</p>
    </div>
  );
};

const ErrorWrapper = (props: JobListingProps) => (
  <ErrorBoundary>
    <JobListing {...props} />
  </ErrorBoundary>
);

export default ErrorWrapper;
