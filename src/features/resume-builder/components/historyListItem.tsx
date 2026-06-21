import { HTMLProps } from "react";
import {
  ChevronIcon,
  SquarePlusIcon,
  TrashIcon,
  XmarkIcon,
} from "@app/components/icons";
import { EditableInputField } from "@app/components/inputs";
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
    titleChanged,
    experienceOrderChanged,
  } = useJob(id);

  const employmentDateChangedHandler = ([start, end]: [string, string]) =>
    dateChanged([start, end]);

  const experiences = Object.entries(job.experience);

  return (
    <div className={className}>
      <div className="inline-flex w-full">
        <div className="flex-1">
          <EditableInputField
            className="w-full"
            type="text"
            title="company name"
            aria-label="Company name"
            name={`company-name-input-${id}`}
            value={job.companyName}
            onChanged={companyNameChanged}
          >
            <strong>{job.companyName}</strong>
          </EditableInputField>
          <div className="inline-flex items-center space-x-1 w-full">
            <EditableInputField
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
          <EditableInputField
            type="text"
            title="job title"
            aria-label="job title"
            name={`job-title-${id}`}
            value={job.title}
            onChanged={titleChanged}
          >
            {job.title}
          </EditableInputField>
          <ul className="p-4 space-y-2">
            {experiences.map(([id, text], ix) => (
              <li key={id}>
                <EditableInputField
                  className="space-x-1 items-start w-full"
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
                    <button
                      type="button"
                      disabled={ix === 0}
                      onClick={() => experienceOrderChanged(id, ix - 1)}
                      title="click to move up"
                    >
                      <ChevronIcon size="sm" direction="up" />
                    </button>
                    <button
                      type="button"
                      disabled={ix === experiences.length - 1}
                      onClick={() => experienceOrderChanged(id, ix + 1)}
                      title="click to move down"
                    >
                      <ChevronIcon size="sm" direction="down" />
                    </button>
                  </div>
                  <p className="flex-1 border-r-gray-800 border-r">{text}</p>
                  <button
                    type="button"
                    title="delete experience"
                    role="button"
                    onClick={() => removeExperience(id)}
                  >
                    <XmarkIcon size="sm" />
                  </button>
                </EditableInputField>
              </li>
            ))}
          </ul>
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
    </div>
  );
};

export default JobHistoryItem;
