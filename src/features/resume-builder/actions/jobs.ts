import type { DateRange } from "../types";

export type JobActionName =
  | "add-job"
  | "remove-job"
  | "update-job"
  | "date-changed-job"
  | "name-changed-job"
  | "title-changed-job";

export interface JobActionType {
  type: JobActionName;
}

export interface AddJobAction extends JobActionType {
  type: "add-job";
}
export interface RemoveJobAction extends JobActionType {
  type: "remove-job";
  payload: { id: string };
}
export interface JobDateChangedAction extends JobActionType {
  type: "date-changed-job";
  payload: {
    jobId: string;
    range: DateRange;
  };
}
export interface JobNameChangedAction extends JobActionType {
  type: "name-changed-job";
  payload: {
    jobId: string;
    newName: string;
  };
}
export interface JobTitleChangedAction extends JobActionType {
  type: "title-changed-job";
  payload: {
    jobId: string;
    newTitle: string;
  };
}

export type DispatchJobActionType =
  | AddJobAction
  | RemoveJobAction
  | JobDateChangedAction
  | JobNameChangedAction
  | JobTitleChangedAction;
