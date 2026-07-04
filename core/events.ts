export enum AppEventName {
  // The names of these events should be in the format
  // of VerbNoun format.
  // The actual value should be noun:verb

  //
  // Resumes

  SaveResume = "resume:save",

  //
  // jobs
  GetJobs = "jobs:list",

  //
  // job listings

  AddJobListing = "job-listing:add",
  RemoveJobListing = "job-listing:remove",
  AddJobListingSuccess = "job-listing:add:success",
  AddJobListingFailed = "job-listing:add:failed",
  RemoveJobListingSuccess = "job-listing:remove:success",
  RemoveJobListingFailed = "job-listing:remove:failed",
  UpdateJobListingSuccess = "job-listing:update:success",
  UpdateJobListingFailed = "job-listing:update:failed",
}
