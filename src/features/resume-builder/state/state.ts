import type { JobHistoryListItem } from "@app/types";
import { faker } from "@faker-js/faker";

export interface ResumeBuilderState {
  fullName: string;
  email: string;
  phone: string;
  about: string;
  jobs: Record<string, JobHistoryListItem>;
}

export const initialState: ResumeBuilderState = {
  fullName: faker.person.fullName(),
  email: faker.internet.exampleEmail(),
  phone: faker.phone.number({ style: "national" }),
  about: faker.lorem.paragraphs(),
  jobs: {},
};
