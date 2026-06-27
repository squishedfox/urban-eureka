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
      <div>
        <div>
          <div className="input-group">
            <label
              id={`company-name-label-${id}`}
              htmlFor={`company-name-label-${id}`}
              className="text-xs"
            >
              Company Name
            </label>
            <input
              id={`company-name-input-${id}`}
              name={`company-name-input-${id}`}
              type="text"
              value={job.companyName}
              onChange={(event) =>
                companyNameChanged(event.currentTarget.value)
              }
            />
          </div>
          <div>
            <div className="input-group">
              <label
                id={`start-date-label-${id}`}
                htmlFor={`start-date-label-${id}`}
              >
                <CalendarIcon size="sm" />
                Start Date
              </label>
              <input
                id={`start-date-input-${id}`}
                name={`start-date-input-${id}`}
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
            <div className="input-group">
              <label
                id={`start-date-label-${id}`}
                htmlFor={`start-date-label-${id}`}
                >
                <CalendarIcon size="sm" />
                End Date
              </label>
              <input
                id={`end-date-input-${id}`}
                name={`end-date-input-${id}`}
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
          <div className="input-group">
            <label
              id={`job-title-label-${id}`}
              htmlFor={`job-title-label-${id}`}
            >
              Job Title
            </label>
            <input
              id={`job-title-input-${id}`}
              name={`job-title-input-${id}`}
              type="text"
              value={job.title}
              onChange={(event) => titleChanged(event.currentTarget.value)}
            />
          </div>
          <ul role="list">
            {experiences.map(([id, text], ix) => (
              <li key={id} className="experience" role="listitem">
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
                <input
                  type="text"
                  title="job experience"
                  aria-label="Job Experience"
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
      <div className="action-group">
        <hr />
        <button
          type="button"
          aria-label="add experience"
          onClick={() => addExperience()}
        >
          <SquarePlusIcon size="md" />
        </button>
      </div>
    </div>
  );
};

export default JobHistoryItem;
