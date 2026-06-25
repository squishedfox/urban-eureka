import { BriefcaseIcon, SquarePlusIcon } from "@app/components";
import { JobList } from "@app/features/applied-jobs";
import { JobListingProvider } from "@app/features/applied-jobs/context";

const JobView = () => (
  <JobListingProvider>
    <div className="flex flex-col p-4">
      <div className="flex space-x-1">
        <BriefcaseIcon />
        <h1 className="text-xl">Applied Jobs</h1>
      </div>
      <div className="self-end">
        <button type="button" title="Click to add">
          <SquarePlusIcon />
        </button>
      </div>
      <JobList className="flex-1" />
    </div>
  </JobListingProvider>
);
export default JobView;
