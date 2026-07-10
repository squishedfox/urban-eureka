import type {
  DegreeIncludeExcludeAction,
  RemoveDegreeAction,
  UpdateDegreeAction,
} from "../actions";
import type { ResumeBuilderState } from "../state";
import type { Degrees } from "@core/types";

import { ulid } from "ulid";

export const addDegreeReducer = (state: ResumeBuilderState) =>
  Object.assign({} as ResumeBuilderState, state, {
    education: Object.assign({}, state.education, {
      degrees: Object.assign({}, state.education.degrees, {
        [ulid()]: {
          title: "",
          institution: "",
          graduationYear: "",
        } as Degrees,
      }),
    }),
  });

export const removeDegreeReducer = (
  state: ResumeBuilderState,
  action: RemoveDegreeAction,
): ResumeBuilderState =>
  Object.assign({}, state, {
    education: Object.assign({}, state.education, {
      degrees: Object.entries(state.education.degrees).reduce(
        (acc, [id, degree]) => {
          if (id !== action.payload.degreeId) {
            acc[id] = degree;
          }
          return acc;
        },
        {} as Record<string, Degrees>,
      ),
    }),
  });

export const updateDegreeReducer = (
  state: ResumeBuilderState,
  action: UpdateDegreeAction,
) =>
  Object.assign({} as ResumeBuilderState, state, {
    education: Object.assign({}, state.education, {
      degrees: Object.assign({}, state.education.degrees, {
        [action.payload.degreeId]: Object.assign(
          {},
          state.education.degrees[action.payload.degreeId],
          {
            [action.payload.field]: action.payload.value,
          },
        ),
      }),
    }),
  });

export const includeExcludeDegreeReducer = (
  state: ResumeBuilderState,
  action: DegreeIncludeExcludeAction,
) =>
  Object.assign({} as ResumeBuilderState, state, {
    education: Object.assign({}, state.education, {
      degrees: Object.assign({}, state.education.degrees, {
        [action.payload.degreeId]: Object.assign(
          {},
          state.education.degrees[action.payload.degreeId],
          {
            included: action.payload.included,
          },
        ),
      }),
    }),
  });
