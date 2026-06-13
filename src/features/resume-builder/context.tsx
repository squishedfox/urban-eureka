import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  type PropsWithChildren,
} from "react";
import { type JobHistoryListItem } from "@app/types";
import {
  type DateRange,
  type ResumeBuilderFormValue,
} from "@app/features/resume-builder/types";
import { initialState } from "./state";
import { resumeBuilderReducer } from "./reducers";
import { usePrevous } from "@app/hooks";

const ResumeBuilderContext = createContext({
  fullName: "",
  email: "",
  phone: "",
  about: "",
  aboutChanged: (newAbout: string) => {
    !!newAbout;
    /* left intentially blank */
  },
  jobs: {} as Record<string, JobHistoryListItem>,
  addJob: () => {
    /* left intentially blank */
  },
  removeJob: (id: string) => {
    !!id;
    /* left intentially blank */
  },
  dateChanged: (id: string, range: DateRange) => {
    !!id;
    !!range;
    /* left intentially blank */
  },
  companyNameChanged: (id: string, newName: string) => {
    !!id;
    !!newName;
    /* left intentially blank */
  },
  addExperience: (jobId: string) => {
    !!jobId;
    /* left intentially blank */
  },
  removeExperience: (jobId: string, experienceId: string) => {
    !!jobId;
    !!experienceId;
    /* left intentially blank */
  },
  updateExperience: (jobId: string, experienceId: string, newValue: string) => {
    !!jobId;
    !!experienceId;
    !!newValue;
    /* left intentially blank */
  },
  fullNameChanged: (newValue: string) => {
    !!newValue;
    /* left intentially blank */
  },
  emailChanged: (newValue: string) => {
    !!newValue;
    /* left intentially blank */
  },
  phoneChanged: (newValue: string) => {
    !!newValue;
    /* left intentially blank */
  },
});

export interface ResumeBuilderFormProviderProps {
  onChange: (formValue: ResumeBuilderFormValue) => void;
}

export const ResumeBuilderFormProvider = ({
  onChange,
  children,
}: PropsWithChildren<ResumeBuilderFormProviderProps>) => {
  const [state, dispatch] = useReducer(resumeBuilderReducer, initialState);

  const addJob = useCallback(() => {
    dispatch({ type: "add-job" });
  }, [dispatch]);

  const removeJob = useCallback(
    (id: string) => {
      dispatch({ type: "remove-job", payload: { id } });
    },
    [dispatch],
  );

  const dateChanged = useCallback(
    (id: string, range: DateRange) => {
      dispatch({
        type: "date-changed-job",
        payload: {
          jobId: id,
          range,
        },
      });
    },
    [dispatch],
  );

  const companyNameChanged = useCallback(
    (id: string, newName: string) => {
      dispatch({
        type: "name-changed-job",
        payload: {
          jobId: id,
          newName,
        },
      });
    },
    [dispatch],
  );

  const addExperience = useCallback(
    (jobId: string) => {
      dispatch({
        type: "add-experience",
        payload: {
          jobId,
        },
      });
    },
    [dispatch],
  );

  const updateExperience = useCallback(
    (jobId: string, experienceId: string, newValue: string) => {
      dispatch({
        type: "update-experience",
        payload: {
          expId: experienceId,
          jobId,
          newValue,
        },
      });
    },
    [dispatch],
  );

  const removeExperience = useCallback(
    (jobId: string, experienceId: string) => {
      dispatch({
        type: "remove-experience",
        payload: {
          jobId,
          expId: experienceId,
        },
      });
    },
    [dispatch],
  );

  const phoneChanged = useCallback(
    (newValue: string) => {
      dispatch({ type: "phone-changed", payload: { newPhone: newValue } });
    },
    [dispatch],
  );

  const fullNameChanged = useCallback(
    (newValue: string) => {
      dispatch({ type: "name-changed", payload: { newName: newValue } });
    },
    [dispatch],
  );

  const emailChanged = useCallback(
    (newValue: string) => {
      dispatch({ type: "email-changed", payload: { newEmail: newValue } });
    },
    [dispatch],
  );

  const aboutChanged = useCallback(
    (newAbout: string) => {
      dispatch({ type: "about-changed", payload: { newAbout } });
    },
    [dispatch],
  );

  useEffect(() => {
    onChange({
      fullName: state.fullName,
      email: state.email,
      phone: state.phone,
      about: state.about,
      jobHistory: Object.values(state.jobs).map((job) => ({
        endDate: job.endDate,
        experience: Object.values(job.experience),
        startDate: job.startDate,
        companyName: job.companyName,
      })),
    });
  }, [state, onChange]);

  return (
    <ResumeBuilderContext.Provider
      value={{
        fullName: state.fullName,
        email: state.email,
        phone: state.phone,
        about: state.about,
        jobs: state.jobs,
        aboutChanged,
        addJob,
        removeJob,
        dateChanged,
        companyNameChanged,
        addExperience,
        removeExperience,
        updateExperience,
        phoneChanged,
        emailChanged,
        fullNameChanged,
      }}
    >
      {children}
    </ResumeBuilderContext.Provider>
  );
};

export const useResumseBuilderForm = () => useContext(ResumeBuilderContext);

export const useJob = (id: string) => {
  const {
    jobs,
    removeJob: removeCurrentJob,
    addExperience: addJobExperience,
    removeExperience: removeJobExperience,
    updateExperience: updateJobExperience,
    dateChanged: jobDateChanged,
    companyNameChanged: jobNameChanged,
  } = useResumseBuilderForm();

  const removeJob = useCallback(
    () => removeCurrentJob(id),
    [removeCurrentJob, id],
  );
  const addExperience = useCallback(
    () => addJobExperience(id),
    [addJobExperience, id],
  );
  const removeExperience = useCallback(
    (experienceId: string) => removeJobExperience(id, experienceId),
    [removeJobExperience, id],
  );
  const updateExperience = useCallback(
    (experienceId: string, newText: string) =>
      updateJobExperience(id, experienceId, newText),
    [updateJobExperience, id],
  );
  const dateChanged = useCallback(
    (range: DateRange) => jobDateChanged(id, range),
    [jobDateChanged, id],
  );
  const companyNameChanged = useCallback(
    (newName: string) => jobNameChanged(id, newName),
    [jobNameChanged, id],
  );

  return {
    job: jobs[id],
    removeJob,
    addExperience,
    removeExperience,
    updateExperience,
    dateChanged,
    companyNameChanged,
  };
};
