import { SquarePlusIcon } from "@app/components";
import { JobList } from "@app/features/jobs";

const JobView = () => (
  <div className="flex flex-col p-4">
    <h1 className="text-xl">Applied Jobs</h1>
    <div className="self-end">
      <button type="button" title="Click to add">
        <SquarePlusIcon />
      </button>
    </div>
    <JobList className="flex-1" />
  </div>
);
export default JobView;
