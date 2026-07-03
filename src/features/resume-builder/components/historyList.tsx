import JobHistoryItem from "./historyListItem";
import { PlusIcon } from "@app/components/icons";
import { useResumeBuilderForm } from "../context";

export interface HistoryListProps {
  className?: string;
}

const HistoryList = ({ className }: HistoryListProps) => {
  const { jobs, addJob } = useResumeBuilderForm();

  return (
    <div className={className}>
      <div className="flex grow items-center">
        <hr className="flex-1" />
        <button onClick={() => addJob()} className="grow-0" type="button">
          <PlusIcon />
        </button>
      </div>
      <ul className="space-y-4" role="list">
        {Object.keys(jobs).map((id) => (
          <li key={id} role="listitem">
            <JobHistoryItem
              className="grow space-y-2 border border-l-gray-800 p-4"
              key={id}
              jobId={id}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryList;
