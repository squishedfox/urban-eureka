import { HTMLProps } from "react";
import {
  CalendarIcon,
  ChevronIcon,
  SquarePlusIcon,
  TrashIcon,
  XmarkIcon,
} from "@app/components/icons";
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
        <div className="flex-1 space-y-1">
          <div className="max-w-1/3">
            <div>
              <label
                id={`company-name-label-${id}`}
                htmlFor={`company-name-label-${id}`}
                className="text-xs"
              >
                Company Name
              </label>
            </div>
            <input
              id={`company-name-input-${id}`}
              name={`company-name-input-${id}`}
              className="border border-gray-800 px-2 py-1 w-full"
              type="text"
              value={job.companyName}
              onChange={(event) =>
                companyNameChanged(event.currentTarget.value)
              }
            />
          </div>
          <div className="inline-flex items-center space-x-1 w-full">
            <div className="max-w-1/2 space-y-1">
              <div className="flex space-x-1">
                <CalendarIcon size="sm" />
                <label
                  id={`start-date-label-${id}`}
                  htmlFor={`start-date-label-${id}`}
                  className="text-xs"
                >
                  Start Date
                </label>
              </div>
              <input
                id={`start-date-input-${id}`}
                name={`start-date-input-${id}`}
                className="border border-gray-800 px-2 py-1"
                type="date"
                value={job.startDate}
                onChange={(event) =>
                  employmentDateChangedHandler([
                    event.currentTarget.value,
                    job.endDate ?? "",
                  ])
                }
              />
            </div>
            <div className="max-w-1/2 space-y-1">
              <div className="flex space-x-1">
                <CalendarIcon size="sm" />
                <label
                  id={`start-date-label-${id}`}
                  htmlFor={`start-date-label-${id}`}
                  className="text-xs"
                >
                  End Date
                </label>
              </div>
              <input
                id={`end-date-input-${id}`}
                name={`end-date-input-${id}`}
                className="border border-gray-800 px-2 py-1 w-full"
                type="date"
                value={job.endDate}
                onChange={(event) =>
                  employmentDateChangedHandler([
                    job.startDate,
                    event.currentTarget.value,
                  ])
                }
              />
            </div>
          </div>
          <div className="max-w-1/2">
            <div>
              <label
                id={`job-title-label-${id}`}
                htmlFor={`job-title-label-${id}`}
                className="text-xs"
              >
                Job Title
              </label>
            </div>
            <input
              id={`job-title-input-${id}`}
              name={`job-title-input-${id}`}
              className="border border-gray-800 px-2 py-1 w-full"
              type="text"
              value={job.title}
              onChange={(event) => titleChanged(event.currentTarget.value)}
            />
          </div>
          <ul className="my-4 space-y-2" role="list">
            {experiences.map(([id, text], ix) => (
              <li key={id} className="flex space-x-1" role="listitem">
                <div className="flex flex-col">
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
                <input
                  type="text"
                  title="job experience"
                  aria-label="Job Experience"
                  className="border border-ray-800 px-2 py-1 grow"
                  name={`${id}-experience-input`}
                  value={text}
                  onChange={(event) =>
                    updateExperience(id, event.currentTarget.value)
                  }
                />
                <button
                  type="button"
                  title="delete experience"
                  role="button"
                  onClick={() => removeExperience(id)}
                >
                  <XmarkIcon size="sm" />
                </button>
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
