import { IconButton } from "@app/components";
import { DateRangeInputGroup, InputGroup } from "@app/components/forms";
import {
  BuildingIcon,
  PersonCircleExclamationIcon,
  SquarePlusIcon,
  TrashIcon,
} from "@app/components/icons";
import { classes } from "@app/tokens";

import { useJob } from "../context";
import ExperienceList from "./experience-list";

export interface JobHistoryItemProps {
  jobId: string;
}

const JobHistoryItem = ({ jobId }: JobHistoryItemProps) => {
  const {
    job,
    dateChanged,
    removeJob,
    companyNameChanged,
    addExperience,
    titleChanged,
  } = useJob(jobId);

  return (
    <fieldset className={classes.forms.fieldsets.default}>
      <legend className={classes.forms.fieldsets.legend}>Job Experience</legend>
      <div className="flex items-start align-end justify-end">
        <button
          type="button"
          title={`delete "${job.companyName || "this job"}" and all related details`}
          onClick={() => removeJob()}
        >
          <TrashIcon size="sm" />
        </button>
      </div>
      <InputGroup
        label={{
          text: "Company Name",
          icon: <BuildingIcon size="sm" />,
        }}
        input={{
          name: "companyName",
          type: "text",
          value: job.companyName,
          onChange: (event) => companyNameChanged(event.currentTarget.value),
        }}
      />
      <DateRangeInputGroup
        range={[job.startDate, job.endDate ?? ""]}
        onChange={dateChanged}
      />
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
      <ExperienceList jobId={jobId} />

      <div className="flex grow items-center">
        <hr className="flex-1" aria-hidden="true" />
        <IconButton
          iconName="square-plus"
          title={`Add experience to "${job.companyName || "this job"}`}
          onClick={() => addExperience()}
        />
      </div>
    </fieldset>
  );
};

export default JobHistoryItem;
