import { DateRangeInputGroup, InputGroup } from "@app/components/forms";
import {
  BuildingIcon,
  PersonCircleExclamationIcon,
  SquarePlusIcon,
  TrashIcon,
} from "@app/components/icons";
import { HTMLProps } from "react";

import { useJob } from "../context";
import ExperienceList from "./experience-list";

export interface JobHistoryItemProps extends Pick<
  HTMLProps<HTMLElement>,
  "className"
> {
  jobId: string;
}

const JobHistoryItem = ({ jobId: id, className }: JobHistoryItemProps) => {
  const {
    job,
    dateChanged,
    removeJob,
    companyNameChanged,
    addExperience,
    titleChanged,
  } = useJob(id);

  return (
    <fieldset
      className={className}
      aria-label={
        job.companyName
          ? `Experience for ${job.companyName}`
          : "New Experience entry"
      }
    >
      <div className="inline-flex w-full">
        <div className="flex-1 space-y-1">
          <div className="max-w-1/3">
            <InputGroup
              label={{
                text: "Company Name",
                icon: <BuildingIcon size="sm" />,
              }}
              input={{
                name: "companyName",
                type: "text",
                value: job.companyName,
                onChange: (event) =>
                  companyNameChanged(event.currentTarget.value),
              }}
            />
          </div>
          <DateRangeInputGroup
            range={[job.startDate, job.endDate ?? ""]}
            onChange={dateChanged}
          />
          <div className="max-w-1/2">
            <InputGroup
              label={{
                text: "Title",
                icon: <PersonCircleExclamationIcon size="sm" />,
              }}
              input={{
                name: "jobTitle",
                type: "text",
                value: job.title,
                onChange: (event) => titleChanged(event.currentTarget.value),
              }}
            />
          </div>
          <ExperienceList jobId={id} />
        </div>
        <div>
          <button
            type="button"
            title={`delete "${job.companyName}" and all related details`}
            aria-label="Delete job"
            onClick={() => removeJob()}
          >
            <TrashIcon size="sm" />
          </button>
        </div>
      </div>
      <div className="flex grow items-center">
        <hr className="flex-1" />
        <button
          type="button"
          aria-label="add experience"
          onClick={() => addExperience()}
          className="grow-0"
        >
          <SquarePlusIcon size="md" />
        </button>
      </div>
    </fieldset>
  );
};

export default JobHistoryItem;
