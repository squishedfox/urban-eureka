import {
  type DateRange,
  type ResumeBuilderFormValue,
} from "@app/features/resume-builder/types";
import {
  type Certification,
  type Degrees,
  type JobHistoryListItem,
} from "@core/types";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  type PropsWithChildren,
} from "react";

import { resumeBuilderReducer } from "../reducers";
import { initialState } from "../state";

// eslint-disable-next-line react-refresh/only-export-components
export const ResumeBuilderContext = createContext({
  fullName: "",
  email: "",
  phone: "",
  about: "",
  aboutChanged: (newAbout: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !!newAbout;
    /* left intentionally blank */
  },
  jobs: {} as Record<string, JobHistoryListItem>,
  addJob: () => {
    /* left intentionally blank */
  },
  removeJob: (id: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !!id;
    /* left intentionally blank */
  },
  dateChanged: (id: string, range: DateRange) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !!id;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !!range;
    /* left intentionally blank */
  },
  companyNameChanged: (id: string, newName: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !!id;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !!newName;
    /* left intentionally blank */
  },
  jobTitleChanged: (id: string, newTitle: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !!id;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !!newTitle;
    /* left intentionally blank */
  },
  addExperience: (jobId: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !!jobId;
    /* left intentionally blank */
  },
  removeExperience: (jobId: string, experienceId: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !!jobId;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !!experienceId;
    /* left intentionally blank */
  },
  updateExperience: (jobId: string, experienceId: string, newValue: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !!jobId;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !!experienceId;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !!newValue;
    /* left intentionally blank */
  },
  experienceOrderChanged: (
    jobId: string,
    experienceId: string,
    newOrdinal: number,
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !!jobId;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !!experienceId;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !!newOrdinal;
    /* left intentionally blank */
  },
  fullNameChanged: (newValue: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !!newValue;
    /* left intentionally blank */
  },
  emailChanged: (newValue: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !!newValue;
    /* left intentionally blank */
  },
  phoneChanged: (newValue: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !!newValue;
    /* left intentionally blank */
  },
  experienceIncludeChanged: (
    jobId: string,
    experienceId: string,
    included: boolean,
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !!jobId;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !!experienceId;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !!included;
    /* left intentionally blank */
  },
  // --- Degree handlers ---
  degrees: {} as Record<string, Degrees>,
  addDegree: () => {
    /* left intentionally blank */
  },
  removeDegree: (degreeId: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !!degreeId;
    /* left intentionally blank */
  },
  updateDegree: (
    degreeId: string,
    field: "title" | "institution" | "graduationYear",
    value: string,
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !!degreeId;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !!field;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !!value;
    /* left intentionally blank */
  },
  degreeIncludeChanged: (degreeId: string, included: boolean) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !!degreeId;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !!included;
    /* left intentionally blank */
  },
  // --- Certification handlers ---
  certifications: {} as Record<string, Certification>,
  addCertification: () => {
    /* left intentionally blank */
  },
  removeCertification: (certId: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !!certId;
    /* left intentionally blank */
  },
  updateCertification: (
    certId: string,
    field: "title" | "issuer" | "dateIssued" | "dateExpires",
    value: string,
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !!certId;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !!field;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !!value;
    /* left intentionally blank */
  },
  certificationIncludeChanged: (certId: string, included: boolean) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !!certId;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !!included;
    /* left intentionally blank */
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

  const jobTitleChanged = useCallback(
    (id: string, newTitle: string) => {
      dispatch({
        type: "title-changed-job",
        payload: {
          jobId: id,
          newTitle,
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

  const experienceOrderChanged = useCallback(
    (jobId: string, expId: string, newOrdinal: number) =>
      dispatch({
        type: "reorder-experience",
        payload: { jobId, expId, newValue: newOrdinal },
      }),
    [dispatch],
  );

  const experienceIncludeChanged = useCallback(
    (jobId: string, expId: string, included: boolean) => {
      dispatch({
        type: "include-exclude-experience",
        payload: {
          jobId,
          expId,
          included,
        },
      });
    },
    [dispatch],
  );

  const addDegree = useCallback(() => {
    dispatch({ type: "add-degree" });
  }, [dispatch]);

  const removeDegree = useCallback(
    (degreeId: string) => {
      dispatch({ type: "remove-degree", payload: { degreeId } });
    },
    [dispatch],
  );

  const updateDegree = useCallback(
    (
      degreeId: string,
      field: "title" | "institution" | "graduationYear",
      value: string,
    ) => {
      dispatch({
        type: "update-degree",
        payload: { degreeId, field, value },
      });
    },
    [dispatch],
  );

  const degreeIncludeChanged = useCallback(
    (degreeId: string, included: boolean) => {
      dispatch({
        type: "include-exclude-degree",
        payload: { degreeId, included },
      });
    },
    [dispatch],
  );

  const addCertification = useCallback(() => {
    dispatch({ type: "add-certification" });
  }, [dispatch]);

  const removeCertification = useCallback(
    (certId: string) => {
      dispatch({ type: "remove-certification", payload: { certId } });
    },
    [dispatch],
  );

  const updateCertification = useCallback(
    (
      certId: string,
      field: "title" | "issuer" | "dateIssued" | "dateExpires",
      value: string,
    ) => {
      dispatch({
        type: "update-certification",
        payload: { certId, field, value },
      });
    },
    [dispatch],
  );

  const certificationIncludeChanged = useCallback(
    (certId: string, included: boolean) => {
      dispatch({
        type: "include-exclude-certification",
        payload: { certId, included },
      });
    },
    [dispatch],
  );

  useEffect(() => {
    // I do not love this logic but here we are
    onChange({
      fullName: state.fullName,
      email: state.email,
      phone: state.phone,
      about: state.about,
      degrees: Object.values(state.education.degrees),
      certifications: Object.values(state.education.certifications),
      jobs: Object.values(state.jobs),
    });
  }, [state, onChange]);

  // try to do some performance tuning in this context so components can also take advantage
  const fullName = useMemo(() => state.fullName, [state.fullName]);
  const email = useMemo(() => state.email, [state.email]);
  const phone = useMemo(() => state.phone, [state.phone]);
  const about = useMemo(() => state.about, [state.about]);
  const jobs = useMemo(() => state.jobs, [state.jobs]);
  const degrees = useMemo(
    () => state.education.degrees,
    [state.education.degrees],
  );
  const certifications = useMemo(
    () => state.education.certifications,
    [state.education.certifications],
  );

  return (
    <ResumeBuilderContext.Provider
      value={{
        fullName,
        email,
        phone,
        about,
        jobs,
        degrees,
        certifications,
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
        jobTitleChanged,
        experienceOrderChanged,
        experienceIncludeChanged,
        addDegree,
        removeDegree,
        updateDegree,
        degreeIncludeChanged,
        addCertification,
        removeCertification,
        updateCertification,
        certificationIncludeChanged,
      }}
    >
      {children}
    </ResumeBuilderContext.Provider>
  );
};
