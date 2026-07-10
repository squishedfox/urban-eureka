export type CertificationActionName =
  | "add-certification"
  | "remove-certification"
  | "update-certification"
  | "include-exclude-certification";

export interface CertificationActionType {
  type: CertificationActionName;
}

export interface AddCertificationAction extends CertificationActionType {
  type: "add-certification";
}

export interface RemoveCertificationAction extends CertificationActionType {
  type: "remove-certification";
  payload: {
    certId: string;
  };
}

export interface UpdateCertificationAction extends CertificationActionType {
  type: "update-certification";
  payload: {
    certId: string;
    field: "title" | "issuer" | "dateIssued" | "dateExpires";
    value: string;
  };
}

export interface CertificationIncludeExcludeAction extends CertificationActionType {
  type: "include-exclude-certification";
  payload: {
    certId: string;
    included: boolean;
  };
}

export type DispatchCertificationActionType =
  | AddCertificationAction
  | RemoveCertificationAction
  | UpdateCertificationAction
  | CertificationIncludeExcludeAction;
