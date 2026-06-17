import { useCallback, type MouseEvent } from "react";
import {
  ChevronIcon,
  EditableField,
  SquarePlusIcon,
  TrashIcon,
  XmarkIcon,
} from "@app/components";
import { useJob } from "../context";

export interface JobHistoryItemProps {
  jobId: string;
  /**
   * Any additional classes to apply to the container element
   */
  className?: string;
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

  const onAddExperienceClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addExperience();
  }, [addExperience])

  const deleteJobHandler = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    removeJob();
  }, [removeJob]);

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
          <EditableField
            type="text"
            label="Company name"
            name={`company-name-input-${id}`}
            value={job.companyName}
            onChanged={(companyName) =>
              companyNameChangeHandler(companyName as string)
            }
            
          >
            <strong>{job.companyName}</strong>
          </EditableField>
          <button
            title={`delete "${job.companyName}" and all related details`}
            aria-label="Delete job"
            onClick={deleteJobHandler}
          >
            <TrashIcon size="sm" />
          </button>
        </div>
        <p className="flex gap-x-1">
          <EditableField
            type="date"
            label="Start Date"
            name={`start-date-input-${id}`}
            value={job.startDate}
            onChanged={(newDate) =>
              employmentDateChangedHandler([
                newDate as string,
                job.endDate as string,
              ])
            }
            
          >
            <span>{job.startDate}</span>
          </EditableField>
          <span>-</span>
          <EditableField
            type="date"
            label="Start Date"
            name={`start-date-input-${id}`}
            value={job.endDate}
            onChanged={(newEndDate) =>
              employmentDateChangedHandler([
                job.startDate,
                newEndDate as string,
              ])
            }
          >
            <span>{job.endDate ? job.endDate : "Current"}</span>
          </EditableField>
        </p>
      </div>
      <ul className="space-y-2">
        {Object.entries(job.experience).map(([id, text]) => (
          <li key={id}>
            <EditableField
              type="text"
              label="Job Experience"
              name={`${id}-experience-input`}
              value={text}
              onChanged={(newExperience) => updateExperience(id, newExperience as string)}>
              <div className="content-start">
                <ChevronIcon size="sm" direction="up" />
                <ChevronIcon size="sm" direction="down" />
              </div>
              <div>
                {text || "Managed delivery of multiple projects on time with solid expectations and quality"}
              </div>
              <button
                title="delete experience"
                role="button"
                onClick={() => removeExperienceHandler(id)}
              >
                <XmarkIcon size="sm" />
              </button>
            </EditableField>
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
