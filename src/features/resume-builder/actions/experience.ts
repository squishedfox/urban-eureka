export type ExperienceActionName =
  | "add-experience"
  | "remove-experience"
  | "update-experience"
  | "reorder-experience";

export interface ExperienceActionType {
  type: ExperienceActionName;
}
export interface AddExperienceAction extends ExperienceActionType {
  type: "add-experience";
  payload: {
    jobId: string;
  };
};

export interface RemoveExperienceAction extends ExperienceActionType {
  type: "remove-experience";
  payload: {
    jobId: string;
    expId: string;
  };
};

export interface UpdateExperienceAction extends ExperienceActionType {
  type: "update-experience";
  payload: {
    jobId: string;
    expId: string;
    newValue: string;
  };
};

export interface ReOrderExperienceAction extends ExperienceActionType {
  type: "reorder-experience";
  payload: {
    jobId: string;
    expId: string;
    newValue: number;
  };
};

export type DispatchExperienceActionType =
  | AddExperienceAction
  | RemoveExperienceAction
  | UpdateExperienceAction
  | ReOrderExperienceAction;

export const isAddExperienceAction = (action: {
  type: string;
}): action is AddExperienceAction => {
  return action.type === "add-experience";
};

export const isRemoveExperienceAction = (action: {
  type: string;
}): action is RemoveExperienceAction => {
  return action.type === "remove-experience";
};

export const isUpdateExperienceAction = (action: {
  type: string;
}): action is UpdateExperienceAction => {
  return action.type === "update-experience";
};

export const isReOrderExperienceAction = (action: {
  type: string;
}): action is UpdateExperienceAction => {
  return action.type === "reorder-experience";
};
