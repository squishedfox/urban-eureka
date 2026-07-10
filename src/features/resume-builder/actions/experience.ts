export type ExperienceActionName =
  | "add-experience"
  | "remove-experience"
  | "update-experience"
  | "reorder-experience"
  | "include-exclude-experience";

export interface ExperienceActionType {
  type: ExperienceActionName;
}
export interface AddExperienceAction extends ExperienceActionType {
  type: "add-experience";
  payload: {
    jobId: string;
  };
}

export interface RemoveExperienceAction extends ExperienceActionType {
  type: "remove-experience";
  payload: {
    jobId: string;
    expId: string;
  };
}

export interface UpdateExperienceAction extends ExperienceActionType {
  type: "update-experience";
  payload: {
    jobId: string;
    expId: string;
    newValue: string;
  };
}

export interface ReOrderExperienceAction extends ExperienceActionType {
  type: "reorder-experience";
  payload: {
    jobId: string;
    expId: string;
    newValue: number;
  };
}

export interface ExperienceIncludeExcludeAction extends ExperienceActionType {
  type: "include-exclude-experience";
  payload: {
    jobId: string;
    expId: string;
    included: boolean;
  };
}

export type DispatchExperienceActionType =
  | AddExperienceAction
  | RemoveExperienceAction
  | UpdateExperienceAction
  | ReOrderExperienceAction
  | ExperienceIncludeExcludeAction;
