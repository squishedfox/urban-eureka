export type AppliedJobActionName = "add-applied-job";

export interface AppliedJobActionType {
  type: AppliedJobActionName;
}

export interface AddAppliedJobAction extends AppliedJobActionType {
  type: "add-applied-job";
}

export const isAddAppliedJobAction = (action: {
  type: string;
}): action is AddAppliedJobAction => {
  return action.type === "add-applied-job";
};
