import type { DispatchCertificationActionType } from "./certifications";
import type { DispatchDegreeActionType } from "./degrees";
import type { DispatchDetailsAction } from "./details";
import type { DispatchExperienceActionType } from "./experience";
import type { DispatchJobActionType } from "./jobs";

export * from "./jobs";
export * from "./experience";
export * from "./details";
export * from "./certifications";
export * from "./degrees";

export type ResumeBuilderActionType =
  | DispatchJobActionType
  | DispatchExperienceActionType
  | DispatchDetailsAction
  | DispatchCertificationActionType
  | DispatchDegreeActionType;
