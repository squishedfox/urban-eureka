import { BriefcaseIcon, SquarePlusIcon } from "@app/components";
import { JobList, useAddAppliedJob } from "@app/features/applied-jobs";

const JobView = () => {
  const { addJobListing } = useAddAppliedJob();

  return (
    <div className="flex flex-col p-4">
      <div className="flex space-x-1">
        <BriefcaseIcon />
        <h1 className="text-xl">Applied Jobs</h1>
      </div>
      <div className="self-end">
        <button
          type="button"
          title="Click to add"
          onClick={() => addJobListing()}
        >
          <SquarePlusIcon />
        </button>
      </div>
      <JobList className="flex-1" />
    </div>
  );
};
export default JobView;
