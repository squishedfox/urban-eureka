import { Certification, Degrees } from "@core/types";

export interface ResumeBuilderFormValue {
  fullName: string;
  phone: string;
  email: string;
  about: string;
  jobHistory: {
    companyName: string;
    endDate?: string;
    startDate: string;
    experience: string[];
  }[];
  degrees: Degrees[];
  certifications: Certification[];
}

export type DateRange = [string, string | undefined];
