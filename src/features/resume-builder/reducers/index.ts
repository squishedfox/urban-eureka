import {
  isAboutChangedAction,
  isAddExperienceAction,
  isAddJobAction,
  isEmailChangedAction,
  isJobDateChangedAction,
  isJobNameChangeAction,
  isJobTitleChangeAction,
  isNameChangedAction,
  isPhoneChangedAction,
  isRemoveExperienceAction,
  isRemoveJobAction,
  isUpdateExperienceAction,
  isReOrderExperienceAction,
  type ResumeBuilderActionType,
  isExperienceIncludeExcludeAction,
} from "../actions";
import { initialState } from "../state";
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
