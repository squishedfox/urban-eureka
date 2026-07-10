import type {
  CertificationIncludeExcludeAction,
  RemoveCertificationAction,
  UpdateCertificationAction,
} from "../actions";
import type { ResumeBuilderState } from "../state";
import type { Certification } from "@core/types";

import { ulid } from "ulid";

export const addCertificationReducer = (state: ResumeBuilderState) =>
  Object.assign({} as ResumeBuilderState, state, {
    education: Object.assign({}, state.education, {
      certifications: Object.assign({}, state.education.certifications, {
        [ulid()]: {
          title: "",
          issuer: "",
          dateIssued: "",
          dateExpires: "",
        },
      }),
    }),
  });

export const removeCertificationReducer = (
  state: ResumeBuilderState,
  action: RemoveCertificationAction,
): ResumeBuilderState =>
  Object.assign({}, state, {
    education: Object.assign({}, state.education, {
      certifications: Object.entries(state.education.certifications).reduce(
        (acc, [id, cert]) => {
          if (id !== action.payload.certId) {
            acc[id] = cert;
          }
          return acc;
        },
        {} as Record<string, Certification>,
      ),
    }),
  });

export const updateCertificationReducer = (
  state: ResumeBuilderState,
  action: UpdateCertificationAction,
) =>
  Object.assign({} as ResumeBuilderState, state, {
    education: Object.assign({}, state.education, {
      certifications: Object.assign({}, state.education.certifications, {
        [action.payload.certId]: Object.assign(
          {},
          state.education.certifications[action.payload.certId],
          {
            [action.payload.field]: action.payload.value,
          },
        ),
      }),
    }),
  });

export const includeExcludeCertificationReducer = (
  state: ResumeBuilderState,
  action: CertificationIncludeExcludeAction,
) =>
  Object.assign({} as ResumeBuilderState, state, {
    education: Object.assign({}, state.education, {
      certifications: Object.assign({}, state.education.certifications, {
        [action.payload.certId]: Object.assign(
          {},
          state.education.certifications[action.payload.certId],
          {
            included: action.payload.included,
          },
        ),
      }),
    }),
  });
