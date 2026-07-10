export type DegreeActionName =
  | "add-degree"
  | "remove-degree"
  | "update-degree"
  | "include-exclude-degree"
  | "show-hide-degree-date";

export interface DegreeActionType {
  type: DegreeActionName;
}

export interface AddDegreeAction extends DegreeActionType {
  type: "add-degree";
  payload: {
    degreeId: string;
  };
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
    field: "title" | "institution" | "graduationYear" | "gpa" | "honors";
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

export interface DegreeShowHideDateAction extends DegreeActionType {
  type: "show-hide-degree-date";
  payload: {
    degreeId: string;
    showDate: boolean;
  };
}

export type DispatchDegreeActionType =
  | AddDegreeAction
  | RemoveDegreeAction
  | UpdateDegreeAction
  | DegreeIncludeExcludeAction
  | DegreeShowHideDateAction;
