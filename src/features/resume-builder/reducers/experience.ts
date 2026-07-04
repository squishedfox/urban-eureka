import { sort } from "@app/objects";
import { type JobHistoryListItem } from "@core/types";
import { faker } from "@faker-js/faker";
import { ulid } from "ulid";

import {
  ReOrderExperienceAction,
  type AddExperienceAction,
  type RemoveExperienceAction,
  type UpdateExperienceAction,
} from "../actions";
import { type ResumeBuilderState } from "../state";

export const addExperienceReducer = (
  state: ResumeBuilderState,
  action: AddExperienceAction,
) =>
  Object.assign({} as ResumeBuilderState, state, {
    jobs: Object.assign({}, state.jobs, {
      [action.payload.jobId]: Object.assign(
        {} as JobHistoryListItem,
        state.jobs[action.payload.jobId],
        {
          experience: Object.assign(
            {},
            state.jobs[action.payload.jobId].experience,
            {
              [ulid()]: faker.lorem.paragraph(),
            },
          ),
        },
      ),
    }),
  });

export const removeExperienceReducer = (
  state: ResumeBuilderState,
  action: RemoveExperienceAction,
): ResumeBuilderState =>
  Object.assign({}, state, {
    jobs: Object.assign({}, state.jobs, {
      [action.payload.jobId]: Object.assign(
        {},
        state.jobs[action.payload.jobId],
        {
          experience: Object.entries(
            state.jobs[action.payload.jobId].experience,
          ).reduce(
            (acc, [id, value]) => {
              if (id !== action.payload.expId) {
                acc[id] = value;
              }
              return acc;
            },
            {} as Record<string, string>,
          ),
        },
      ),
    }),
  });

export const updateExperienceReducer = (
  state: ResumeBuilderState,
  action: UpdateExperienceAction,
) =>
  Object.assign({} as ResumeBuilderState, state, {
    jobs: Object.assign({}, state.jobs, {
      [action.payload.jobId]: Object.assign(
        {},
        state.jobs[action.payload.jobId],
        {
          experience: Object.assign(
            {},
            state.jobs[action.payload.jobId].experience,
            {
              [action.payload.expId]: action.payload.newValue,
            },
          ),
        },
      ),
    }),
  });

export const reOrderExperienceReducer = (
  state: ResumeBuilderState,
  action: ReOrderExperienceAction,
) =>
  Object.assign({} as ResumeBuilderState, state, {
    jobs: Object.assign({}, state.jobs, {
      [action.payload.jobId]: Object.assign(
        {},
        state.jobs[action.payload.jobId],
        {
          experience: sort(
            action.payload.expId,
            action.payload.newValue,
            state.jobs[action.payload.jobId].experience,
          ),
        },
      ),
    }),
  });
