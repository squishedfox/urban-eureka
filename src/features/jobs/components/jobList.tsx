import { useGetJobs } from "@app/features/jobs/hooks";
import clsx from "clsx";

export interface JobListProps {
  className?: string;
}

const JobList = ({ className }: JobListProps) => {
  const { state, jobs = [] } = useGetJobs();

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
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default JobList;
