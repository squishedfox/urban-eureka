import { ChevronIcon, XmarkIcon } from "@app/components";
import { classes } from "@app/tokens";
import clsx from "clsx";

import { useExperience, useJob } from "../context";

export interface ExperienceListItemProps {
  className?: string;
  jobId: string;
  experienceId: string;
  ordinal: number;
  isLast?: boolean;
}

const ExperienceListItem = ({
  className,
  jobId,
  experienceId,
  ordinal,
}: ExperienceListItemProps) => {
  const {
    experience: { text, included },
    remove,
    updateText,
    reOrder,
    includeExclude,
  } = useExperience({
    jobId,
    experienceId,
  });

  return (
    <div className={clsx("flex space-x-1", className)}>
      <div className="flex items-center px-1">
        <label
          title={`Click to ${included ? "Exclude" : "include"} from current resume`}
          htmlFor={`job-experience-include-exclude-checkbox-${experienceId}`}
          hidden
          aria-hidden="false"
        >
          {included ? "Exclude" : "Include"}
        </label>
        <input
          type="checkbox"
          name={`include-exclude-${experienceId}`}
          checked={included}
          className="w-4 h-4"
          onChange={(event) => includeExclude(event.target.checked)}
        />
      </div>
      <span className="border-r border-r-gray-800"></span>
      <div className="flex flex-col">
        <button
          type="button"
          disabled={ordinal === 0}
          onClick={() => reOrder(ordinal - 1)}
          title="click to move up"
        >
          <ChevronIcon size="sm" direction="up" />
        </button>
        <button
          type="button"
          disabled={ordinal === experienceId.length - 1}
          onClick={() => reOrder(ordinal + 1)}
          title="click to move down"
        >
          <ChevronIcon size="sm" direction="down" />
        </button>
      </div>
      <input
        type="text"
        title="job experience"
        aria-label="Job Experience"
        className={clsx(classes.input, "grow")}
        name={`${experienceId}-experience-input`}
        value={text}
        onChange={(event) => updateText(event.currentTarget.value)}
      />
      <button type="button" title="delete experience" onClick={() => remove()}>
        <XmarkIcon />
      </button>
    </div>
  );
};

export interface ExperienceListProps {
  className?: string;
  jobId: string;
}

const ExperienceList = ({ className, jobId }: ExperienceListProps) => {
  const {
    job: { experience },
  } = useJob(jobId);

  const ids = Object.keys(experience);

  return (
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <ul className={clsx("my-4 space-y-2", className)} role="list">
      {ids.map((experienceId: string, ix) => (
        <li key={experienceId}>
          <ExperienceListItem
            jobId={jobId}
            experienceId={experienceId}
            ordinal={ix}
            isLast={ix === ids.length - 1}
          />
        </li>
      ))}
    </ul>
  );
};

export default ExperienceList;
