import { useGetJobs } from "@app/features/jobs/hooks";

export interface JobListProps {}

const JobList = () => {
  const { state, jobs = [] } = useGetJobs();

  if (state === "pending" || state === "fetching") {
    return <p>Loading</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <td>Company Name</td>
          <td>Title</td>
          <td>Date Applied</td>
          <td>Salary</td>
          <td>Link</td>
        </tr>
      </thead>
      <tbody>
        {jobs.map((job) => (
          <tr key={job.companyName}>
            <td>{job.title}</td>
            <td>{job.dateApplied}</td>
            <td>{job.salary}</td>
            <td>{job.applicationLink}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default JobList;
