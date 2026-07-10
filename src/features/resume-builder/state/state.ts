import type { Certification, Degrees, JobHistoryListItem } from "@core/types";

import { faker } from "@faker-js/faker";

export interface ResumeBuilderState {
  fullName: string;
  email: string;
  phone: string;
  about: string;
  jobs: Record<string, JobHistoryListItem>;
  education: {
    degrees: Record<string, Degrees>;
    certifications: Record<string, Certification>;
  };
}

export const initialState: ResumeBuilderState = {
  fullName: faker.person.fullName(),
  email: faker.internet.exampleEmail(),
  phone: faker.phone.number({ style: "national" }),
  about: faker.lorem.paragraphs(),
  jobs: {},
  education: {
    degrees: {},
    certifications: {},
  },
};
