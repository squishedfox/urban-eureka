import JobHistoryItem from "./historyListItem";
import { PlusIcon } from "@app/components/icons";
import { ErrorBoundary } from "@app/components";
import { useResumeBuilderForm } from "../context";

export interface HistoryListProps {
  className?: string;
}

const HistoryList = ({ className }: HistoryListProps) => {
  const { jobs, addJob } = useResumeBuilderForm();

  return (
    <div className={className}>
      <div className="action-group">
        <hr />
        <button type="button" onClick={() => addJob()}>
          <PlusIcon />
        </button>
      </div>
      <ul>
        {Object.keys(jobs).map((id) => (
          <li key={id}>
            <ErrorBoundary>
              <JobHistoryItem
                key={id}
                jobId={id}
              />
            </ErrorBoundary>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryList;
