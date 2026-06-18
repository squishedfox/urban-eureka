import { HTMLProps, useCallback, type MouseEvent } from "react";
import {
  ChevronIcon,
  EditableInputField,
  SquarePlusIcon,
  TrashIcon,
  XmarkIcon,
} from "@app/components";
import { useJob } from "../context";

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
    updateExperience,
    removeExperience,
  } = useJob(id);

  const onAddExperienceClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      addExperience();
    },
    [addExperience],
  );

  const deleteJobHandler = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      removeJob();
    },
    [removeJob],
  );

  const employmentDateChangedHandler = ([start, end]: [string, string]) =>
    dateChanged([start, end]);
  const removeExperienceHandler = (experienceId: string) =>
    removeExperience(experienceId);
  const companyNameChangeHandler = (newCompanyName: string) =>
    companyNameChanged(newCompanyName);

  return (
    <div className={className}>
      <div>
        <div className="flex grow place-content-between">
          <EditableInputField
            className="w-full"
            type="text"
            title="company name"
            aria-label="Company name"
            name={`company-name-input-${id}`}
            value={job.companyName}
            onChanged={(companyName) =>
              companyNameChangeHandler(companyName as string)
            }
          >
            <strong>{job.companyName}</strong>
          </EditableInputField>
          <button
            title={`delete "${job.companyName}" and all related details`}
            aria-label="Delete job"
            onClick={deleteJobHandler}
          >
            <TrashIcon size="sm" />
          </button>
        </div>
        <div className="inline-flex gap-x-1">
          <EditableInputField
            className="flex align-middle space-x-1"
            type="date"
            title="start date"
            aria-label="Start Date"
            name={`start-date-input-${id}`}
            value={job.startDate}
            onChanged={(newDate) =>
              employmentDateChangedHandler([
                newDate as string,
                job.endDate as string,
              ])
            }
          >
            {job.startDate}
          </EditableInputField>
          <span>-</span>
          <EditableInputField
            className="flex align-middle space-x-1"
            type="date"
            title="end date"
            aria-label="end Date"
            name={`end-date-input-${id}`}
            value={job.endDate}
            onChanged={(newEndDate) =>
              employmentDateChangedHandler([
                job.startDate,
                newEndDate as string,
              ])
            }
          >
            {job.endDate || "Current"}
          </EditableInputField>
        </div>
      </div>
      <ul className="pl-4 space-y-2">
        {Object.entries(job.experience).map(([id, text]) => (
          <li key={id}>
            <EditableInputField
              className="flex flex-1 items-center space-x-1"
              type="text"
              title="job experience"
              aria-label="Job Experience"
              name={`${id}-experience-input`}
              value={text}
              onChanged={(newExperience) =>
                updateExperience(id, newExperience as string)
              }
            >
              <div>
                <ChevronIcon size="sm" direction="up" />
                <ChevronIcon size="sm" direction="down" />
              </div>
              <div>
                {text ||
                  "Managed delivery of multiple projects on time with solid expectations and quality"}
              </div>
              <button
                title="delete experience"
                role="button"
                onClick={() => removeExperienceHandler(id)}
              >
                <XmarkIcon size="sm" />
              </button>
            </EditableInputField>
          </li>
        ))}
      </ul>
      <div className="flex grow items-center">
        <hr className="flex-1" />
        <button
          aria-label="add experience"
          onClick={onAddExperienceClick}
          className="grow-0"
        >
          <SquarePlusIcon size="md" />
        </button>
      </div>
    </div>
  );
};

export default JobHistoryItem;
