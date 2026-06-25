import { JobListing } from "@app/features/jobs/types";

export type JobListingActionName =
  | "get-job-listings"
  | "add-job-listing"
  | "update-job-listing-request"
  | "update-job-listing-failed"
  | "update-job-listing-success"
  | "remove-job-listing-request"
  | "remove-job-listing-failed"
  | "remove-job-listing-success";

export interface JobListingActionType {
  type: JobListingActionName;
}

export interface GetJobListingsAction extends JobListingActionType {
  type: "get-job-listings";
}

export interface AddJobListingAction extends JobListingActionType {
  type: "add-job-listing";
}

export interface UpdateJobListingAction extends JobListingActionType {
  type: "update-job-listing-request";
  payload: {
    id: string;
    listing: JobListing;
  };
}

export interface UpdateJobListingSuccessAction extends JobListingActionType {
  type: "update-job-listing-success";
}

export interface UpdateJobListingFailedAction extends JobListingActionType {
  type: "update-job-listing-failed";
  payload: Error;
}

export interface RemoveJobListingAction extends JobListingActionType {
  type: "remove-job-listing-request";
  payload: {
    id: string;
  };
}

export interface RemoveJobListingSuccessAction extends JobListingActionType {
  type: "remove-job-listing-success";
}

export interface RemoveJobListingFailedAction extends JobListingActionType {
  type: "remove-job-listing-failed";
  payload: Error;
}

export const isAction = <T extends { type: string }>(
  actionName: string,
  action: T,
): action is T => {
  return action.type === actionName;
};
