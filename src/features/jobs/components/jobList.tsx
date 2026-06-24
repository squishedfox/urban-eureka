import clsx from "clsx";
import { useJobListings } from "../context";
import { XmarkIcon } from "@app/components";

export interface JobListProps {
  className?: string;
}

const JobList = ({ className }: JobListProps) => {
  const {
    getJobs,
  } = useJobListings();

  const { state, jobs = [] } = getJobs();

  if (state === "pending" || state === "fetching") {
    return <p>Loading</p>;
  }

  return (
    <table className={clsx("table-auto", className)}>
      <thead className="table-header-group border border-gray-800">
        <tr className="table-row mb-1">
          <td className="table-cell border-r border-r-gray-800 px-2 py-1">
            Company Name
          </td>
          <td className="table-cell border-r border-r-gray-800 px-2 py-1">Title</td>
          <td className="table-cell border-r border-r-gray-800 px-2 py-1">
            Date Applied
          </td>
          <td className="table-cell border-r border-r-gray-800 px-2 py-1">Salary</td>
          <td className="table-cell px-2 py-1">Link</td>
          <td className="table-cell px-2 py-1">Actions</td>
        </tr>
      </thead>
      <tbody>
        {jobs.map((job) => (
          <tr key={job.companyName} className="table-row" role="row">
            <td className="table-cell px-2 py-1">{job.companyName}</td>
            <td className="table-cell px-2 py-1">{job.title}</td>
            <td className="table-cell px-2 py-1">{job.dateApplied}</td>
            <td className="table-cell px-2 py-1">{job.salary}</td>
            <td className="table-cell px-2 py-1">{job.applicationLink}</td>
            <td className="table-cell px-2 py-1">
              <div className="inline-flex space-x-1">
                <button type="button">
                  <XmarkIcon />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default JobList;
