import { IconButton, XmarkIcon } from "@app/components";
import {
  useGetJobListings,
  useRemoveJobListing,
} from "@app/features/applied-jobs/hooks";
import { classes } from "@app/tokens";
import clsx from "clsx";

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
    <table className={clsx(classes.table.classes, className)}>
      <thead className={classes.table.thead}>
        <tr className={classes.table.headerRow}>
          <td className={classes.table.cellHeader}>Company Name</td>
          <td className={classes.table.cellHeader}>Title</td>
          <td className={classes.table.cellHeader}>Date Applied</td>
          <td className={classes.table.cellHeader}>Salary</td>
          <td className={classes.table.cellHeader}>Link</td>
          <td className={classes.table.cellHeader}>Actions</td>
        </tr>
      </thead>
      <tbody>
        {Object.entries(jobs).map(([id, listing]) => (
          <tr key={id} className={classes.table.row}>
            <td className={classes.table.cell}>{listing.companyName}</td>
            <td className={classes.table.cell}>{listing.title}</td>
            <td className={classes.table.cell}>{listing.dateApplied}</td>
            <td className={classes.table.cell}>
              {Intl.NumberFormat().format(listing.salary)}
            </td>
            <td className={classes.table.cell}>{listing.applicationLink}</td>
            <td className={classes.table.cell}>
              <IconButton
                iconName="x-mark"
                onClick={() => removeJobListing(id)}
                title={`Delete ${listing.companyName} listing`}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default JobList;
