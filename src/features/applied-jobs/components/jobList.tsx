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

  return (
    <table className={clsx("table-auto", className)}>
      <thead className="table-header-group">
        <tr className="table-row mb-1">
          <td className="table-cell border-r">
            Company Name
          </td>
          <td className="table-cell border-r">
            Title
          </td>
          <td className="table-cell border-r">
            Date Applied
          </td>
          <td className="table-cell border-r">
            Salary
          </td>
          <td className="table-cell border-r">
            Link
          </td>
          <td className="table-cell">Actions</td>
        </tr>
      </thead>
      <tbody>
        {Object.entries(jobs).map(([id, listing]) => (
          <tr key={id} className="table-row">
            <td className="table-cell">{listing.companyName}</td>
            <td className="table-cell">{listing.title}</td>
            <td className="table-cell">{listing.dateApplied}</td>
            <td className="table-cell">
              {Intl.NumberFormat().format(listing.salary)}
            </td>
            <td className="table-cell">{listing.applicationLink}</td>
            <td className="table-cell">
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
