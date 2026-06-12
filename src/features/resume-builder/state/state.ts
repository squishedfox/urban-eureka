import type { JobHistoryListItem } from "@app/types";

export interface ResumeBuilderState {
  fullName: string;
  email: string;
  phone: string;
  about: string;
  jobs: Record<string, JobHistoryListItem>;
}
export const initialState: ResumeBuilderState = {
  fullName: "",
  email: "",
  phone: "",
  about: "",
  jobs: {},
};
