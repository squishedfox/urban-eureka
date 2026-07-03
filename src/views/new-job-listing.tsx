import { NewJobListing } from "@app/features/applied-jobs";

const NewJobListingView = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl">New Job Listing</h2>
      <NewJobListing />
    </div>
  );
};

export default NewJobListingView;
