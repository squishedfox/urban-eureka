import { type ResumeBuilderActionType } from "../actions";
import { initialState } from "../state";
import {
  addCertificationReducer,
  includeExcludeCertificationReducer,
  removeCertificationReducer,
  updateCertificationReducer,
} from "./certifications";
import {
  addDegreeReducer,
  includeExcludeDegreeReducer,
  removeDegreeReducer,
  updateDegreeReducer,
} from "./degree";
import {
  addExperienceReducer,
  removeExperienceReducer,
  updateExperienceReducer,
  reOrderExperienceReducer,
  includeExcludeExperienceReducer,
} from "./experience";
import {
  addJobReducer,
  jobDateChangedReducer,
  jobNameChangedReducer,
  jobTitleChangedReducer,
  removeJobReducer,
} from "./jobs";

export const resumeBuilderReducer = (
  state = initialState,
  action: ResumeBuilderActionType,
) => {
  switch (action.type) {
    case "add-job":
      return addJobReducer(state);
    case "remove-job":
      return removeJobReducer(state, action);
    case "date-changed-job":
      return jobDateChangedReducer(state, action);
    case "name-changed-job":
      return jobNameChangedReducer(state, action);
    case "title-changed-job":
      return jobTitleChangedReducer(state, action);
    case "add-experience":
      return addExperienceReducer(state, action);
    case "remove-experience":
      return removeExperienceReducer(state, action);
    case "update-experience":
      return updateExperienceReducer(state, action);
    case "include-exclude-experience":
      return includeExcludeExperienceReducer(state, action);
    case "reorder-experience":
      return reOrderExperienceReducer(state, action);
    case "add-degree":
      return addDegreeReducer(state);
    case "remove-degree":
      return removeDegreeReducer(state, action);
    case "update-degree":
      return updateDegreeReducer(state, action);
    case "include-exclude-degree":
      return includeExcludeDegreeReducer(state, action);
    case "add-certification":
      return addCertificationReducer(state);
    case "remove-certification":
      return removeCertificationReducer(state, action);
    case "update-certification":
      return updateCertificationReducer(state, action);
    case "include-exclude-certification":
      return includeExcludeCertificationReducer(state, action);
    case "about-changed":
      return Object.assign({}, state, {
        about: action.payload.newAbout,
      });
    case "name-changed":
      return Object.assign({}, state, {
        fullName: action.payload.newName,
      });
    case "email-changed":
      return Object.assign({}, state, {
        email: action.payload.newEmail,
      });
    case "phone-changed":
      return Object.assign({}, state, {
        phone: action.payload.newPhone,
      });
    default:
      return state;
  }
};
