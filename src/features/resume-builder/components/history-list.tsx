import { PlusIcon } from "@app/components/icons";

import { useResumeBuilderForm } from "../context";
import JobHistoryItem from "./history-list-item";

export interface HistoryListProps {
  className?: string;
}

const HistoryList = ({ className }: HistoryListProps) => {
  const { jobs, addJob } = useResumeBuilderForm();

  return (
    <fieldset className={className}>
      <legend className="flex w-full items-center space-x-1 text-lg font-bold">
        <span>Experience</span>
        <hr className="flex-1" />
        <button onClick={() => addJob()} className="grow-0" type="button">
          <PlusIcon />
        </button>
      </legend>
      {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
      <ul className="space-y-4" role="list">
        {Object.keys(jobs).map((id) => (
          // eslint-disable-next-line jsx-a11y/no-redundant-roles
          <li key={id} role="listitem">
            <JobHistoryItem
              className="grow space-y-2 border border-l-gray-800 p-4"
              key={id}
              jobId={id}
            />
          </li>
        ))}
      </ul>
    </fieldset>
  );
};

export default HistoryList;
