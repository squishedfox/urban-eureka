import { BriefcaseIcon, SquarePlusIcon } from "@app/components";
import { JobList } from "@app/features";
import { Link } from "react-router-dom";

const JobView = () => (
  <div className="flex flex-col space-y-2 p-4">
    <div className="flex space-x-1">
      <BriefcaseIcon />
      <h1 className="text-xl">Applied Jobs</h1>
    </div>
    <div className="self-end">
      <Link title="Click to create new job listing" to="/jobs/new">
        <SquarePlusIcon />
      </Link>
    </div>
    <JobList className="flex-1" />
  </div>
);

export default JobView;
