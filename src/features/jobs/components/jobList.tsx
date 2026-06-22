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
          <td className="table-cell border-r border-r-gray-800 px-2">
            Company Name
          </td>
          <td className="table-cell border-r border-r-gray-800 px-2">Title</td>
          <td className="table-cell border-r border-r-gray-800 px-2">
            Date Applied
          </td>
          <td className="table-cell border-r border-r-gray-800 px-2">Salary</td>
          <td className="table-cell px-2">Link</td>
        </tr>
      </thead>
      <tbody>
        {jobs.map((job) => (
          <tr key={job.companyName} className="table-row">
            <td className="table-cell">{job.companyName}</td>
            <td className="table-cell">{job.title}</td>
            <td className="table-cell">{job.dateApplied}</td>
            <td className="table-cell">{job.salary}</td>
            <td className="table-cell">{job.applicationLink}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default JobList;
