import { IconButton } from "@app/components";

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
        <IconButton
          iconName="plus"
          onClick={addJob}
          type="button"
          title="add job history"
        />
      </div>
      <div className="space-y-4">
        {Object.keys(jobs).map((id) => (
          <JobHistoryItem key={id} jobId={id} />
        ))}
      </div>
    </div>
  );
};

export default HistoryList;
