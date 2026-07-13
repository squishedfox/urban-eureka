import { Certification, Degrees, JobHistoryListItem } from "@core/types";

export interface ResumeBuilderFormValue {
  fullName: string;
  phone: string;
  email: string;
  about: string;
  jobs: JobHistoryListItem[];
  degrees: Degrees[];
  certifications: Certification[];
}

export type DateRange = [string, string | undefined];
