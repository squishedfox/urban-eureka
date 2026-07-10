import type { ResumeBuilderState } from "../state";

import { type JobHistoryListItem } from "@core/types";
import { faker } from "@faker-js/faker";
import { ulid } from "ulid";

import {
  JobTitleChangedAction,
  type JobDateChangedAction,
  type JobNameChangedAction,
  type RemoveJobAction,
} from "../actions";

export const createEmptyJobHistoryItem = (): JobHistoryListItem => ({
  companyName: faker.company.name(),
  startDate: faker.date.past({ years: 1 }).toLocaleDateString(),
  endDate: "",
  title: faker.person.jobTitle(),
  experience: {} as Record<string, { text: string; included: boolean }>,
});

export const addJobReducer = (prev: ResumeBuilderState) =>
  Object.assign({}, prev, {
    jobs: Object.assign({}, prev.jobs, {
      [ulid()]: createEmptyJobHistoryItem(),
    }),
  });

export const removeJobReducer = (
  prev: ResumeBuilderState,
  action: RemoveJobAction,
) =>
  Object.assign({}, prev, {
    jobs: Object.entries(prev.jobs).reduce(
      (acc, [id, job]) => {
        if (id !== action.payload.id) {
          acc[id] = Object.assign({}, job);
        }
        return acc;
      },
      {} as Record<string, JobHistoryListItem>,
    ),
  });

export const jobDateChangedReducer = (
  prev: ResumeBuilderState,
  action: JobDateChangedAction,
) =>
  Object.assign({}, prev, {
    jobs: Object.assign({}, prev.jobs, {
      [action.payload.jobId]: Object.assign(
        {},
        prev.jobs[action.payload.jobId],
        {
          startDate: action.payload.range[0],
          endDate: action.payload.range[1],
        },
      ),
    }),
  });

export const jobNameChangedReducer = (
  prev: ResumeBuilderState,
  action: JobNameChangedAction,
) =>
  Object.assign({}, prev, {
    jobs: Object.assign({}, prev.jobs, {
      [action.payload.jobId]: Object.assign(
        {},
        prev.jobs[action.payload.jobId],
        {
          companyName: action.payload.newName,
        },
      ),
    }),
  });

export const jobTitleChangedReducer = (
  prev: ResumeBuilderState,
  action: JobTitleChangedAction,
) =>
  Object.assign({}, prev, {
    jobs: Object.assign({}, prev.jobs, {
      [action.payload.jobId]: Object.assign(
        {},
        prev.jobs[action.payload.jobId],
        {
          title: action.payload.newTitle,
        },
      ),
    }),
  });
