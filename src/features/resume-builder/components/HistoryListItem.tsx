import { useCallback, type ChangeEvent, type MouseEvent } from "react";
import {
  ChevronIcon,
  DateRangeField,
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
    job: { companyName, startDate, endDate, experience },
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

  const experienceChangedHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      updateExperience(event.target.name, event.target.value),
    [updateExperience],
  );
  const employmentDateChangedHandler = useCallback(
    ([start, end]: [string, string]) => dateChanged([start, end]),
    [dateChanged],
  );
  const removeExperienceHandler = useCallback(
    (experienceId: string) => removeExperience(experienceId),
    [removeExperience],
  );
  const companyNameChangeHandler = useCallback(
    (newCompanyName: string) => companyNameChanged(newCompanyName),
    [companyNameChanged],
  );

  return (
    <div className={className}>
      <div>
        <div className="flex grow place-content-between">
          <EditableField
            value={companyName}
            type="text"
            onChanged={(companyName) =>
              companyNameChangeHandler(companyName as string)
            }
          >
            <strong>{companyName}</strong>
          </EditableField>
          <button
            title={`delete "${companyName}" and all related details`}
            aria-label="Delete job"
            onClick={deleteJobHandler}
          >
            <TrashIcon size="sm" />
          </button>
        </div>
        <p className="inline-flex gap-x-1 items-center">
          <DateRangeField
            value={[startDate, endDate ?? ""]}
            onChanged={(newRange) => employmentDateChangedHandler(newRange)}
          >
            <span>{endDate ? endDate : "Current"}</span>
            <span>-</span>
            <span>{endDate ? endDate : "Current"}</span>
          </DateRangeField>
        </p>
      </div>
      <ul className="space-y-2">
        {Object.entries(experience).map(([id, text]) => (
          <li key={id}>
            <div className="flex items-center gap-x-1">
              <div className="content-start">
                <ChevronIcon size="sm" direction="up" />
                <ChevronIcon size="sm" direction="down" />
              </div>
              <input
                placeholder="Implemented data driven features using analytical tools such as amplitude, clarity, google analtyics, etc."
                type="text"
                className="flex-1 border border-gray-800 px-1 py-0.5"
                id={id}
                name={id}
                maxLength={250}
                value={text}
                onChange={experienceChangedHandler}
              />
              <button
                title="delete experience"
                role="button"
                onClick={() => removeExperienceHandler(id)}
              >
                <XmarkIcon size="sm" />
              </button>
            </div>
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
