import type { JobHistoryListItem } from "@app/types";

export interface ResumeBuilderState {
  fullName: string;
  email: string;
  phone: string;
  about: string;
  jobs: Record<string, JobHistoryListItem>;
}
export const initialState: ResumeBuilderState = {
  fullName: "a full name here. click the pencil icon to change",
  email: "first.last@adomain.com",
  phone: "+1 555-555-5555",
  about: "",
  jobs: {},
};
