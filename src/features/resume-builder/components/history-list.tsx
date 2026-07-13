import { PlusIcon } from "@app/components/icons";

import { useResumeBuilderForm } from "../context";
import JobHistoryItem from "./history-list-item";

export interface HistoryListProps {
  className?: string;
}

const HistoryList = ({ className }: HistoryListProps) => {
  const { jobs, addJob } = useResumeBuilderForm();

  return (
    <div className={className}>
      <div className="flex w-full items-center space-x-1 text-lg font-bold">
        <span>Experience</span>
        <hr className="flex-1" aria-hidden="true" />
        <button onClick={() => addJob()} className="grow-0" type="button">
          <PlusIcon />
        </button>
      </div>
      <div className="space-y-4">
        {Object.keys(jobs).map((id) => (
          <JobHistoryItem
            className="grow space-y-2 border border-l-gray-800 p-4"
            key={id}
            jobId={id}
          />
        ))}
      </div>
    </div>
  );
};

export default HistoryList;
