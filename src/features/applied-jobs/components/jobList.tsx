import clsx from "clsx";
import { XmarkIcon } from "@app/components";
import {
  useGetJobListings,
  useRemoveJobListing,
} from "@app/features/applied-jobs/hooks";

export interface JobListProps {
  className?: string;
}

const JobList = ({ className }: JobListProps) => {
  const { state, jobs = {} } = useGetJobListings();
  const { removeJobListing } = useRemoveJobListing();

  if (state === "pending" || state === "fetching") {
    return <p>Loading</p>;
  }

  console.log(jobs);

  return (
    <table className={clsx("table-auto", className)}>
      <thead className="table-header-group border border-gray-800">
        <tr className="table-row mb-1">
          <td className="table-cell border-r border-r-gray-800 px-2 py-1">
            Company Name
          </td>
          <td className="table-cell border-r border-r-gray-800 px-2 py-1">
            Title
          </td>
          <td className="table-cell border-r border-r-gray-800 px-2 py-1">
            Date Applied
          </td>
          <td className="table-cell border-r border-r-gray-800 px-2 py-1">
            Salary
          </td>
          <td className="table-cell px-2 py-1">Link</td>
          <td className="table-cell px-2 py-1">Actions</td>
        </tr>
      </thead>
      <tbody>
        {Object.entries(jobs).map(([id, listing]) => (
          <tr key={id} className="table-row">
            <td className="table-cell px-2 py-1">{listing.companyName}</td>
            <td className="table-cell px-2 py-1">{listing.title}</td>
            <td className="table-cell px-2 py-1">{listing.dateApplied}</td>
            <td className="table-cell px-2 py-1">{listing.salary}</td>
            <td className="table-cell px-2 py-1">{listing.applicationLink}</td>
            <td className="table-cell px-2 py-1">
              <div className="inline-flex space-x-1">
                <button type="button" onClick={() => removeJobListing(id)}>
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
