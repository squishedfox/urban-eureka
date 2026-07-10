export type DegreeActionName =
  "add-degree" | "remove-degree" | "update-degree" | "include-exclude-degree";

export interface DegreeActionType {
  type: DegreeActionName;
}

export interface AddDegreeAction extends DegreeActionType {
  type: "add-degree";
}

export interface RemoveDegreeAction extends DegreeActionType {
  type: "remove-degree";
  payload: {
    degreeId: string;
  };
}

export interface UpdateDegreeAction extends DegreeActionType {
  type: "update-degree";
  payload: {
    degreeId: string;
    field: "title" | "institution" | "graduationYear";
    value: string;
  };
}

export interface DegreeIncludeExcludeAction extends DegreeActionType {
  type: "include-exclude-degree";
  payload: {
    degreeId: string;
    included: boolean;
  };
}

export type DispatchDegreeActionType =
  | AddDegreeAction
  | RemoveDegreeAction
  | UpdateDegreeAction
  | DegreeIncludeExcludeAction;
