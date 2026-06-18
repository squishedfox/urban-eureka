import type { DateRange } from "../types";
import type { ResumeBuilderActionType } from "../actions";

export type JobActionName =
  | "add-job"
  | "remove-job"
  | "update-job"
  | "date-changed-job"
  | "name-changed-job";

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

export const isAddJobAction = (
  action: ResumeBuilderActionType,
): action is AddJobAction => {
  return action.type === "add-job";
};

export const isRemoveJobAction = (
  action: ResumeBuilderActionType,
): action is RemoveJobAction => {
  return action.type === "remove-job";
};

export const isJobDateChangedAction = (
  action: ResumeBuilderActionType,
): action is JobDateChangedAction => {
  return action.type === "date-changed-job";
};

export const isJobNameChangeAction = (
  action: ResumeBuilderActionType,
): action is JobNameChangedAction => {
  return action.type === "name-changed-job";
};

export const isJobTitleChangeAction = (
  action: ResumeBuilderActionType,
): action is JobTitleChangedAction => {
  return action.type === "title-changed-job";
};
