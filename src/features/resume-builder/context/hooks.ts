import { useCallback, useContext } from "react";
import { DateRange } from "../types";
import { ResumeBuilderContext } from "./context";

export const useResumeBuilderForm = () => useContext(ResumeBuilderContext);

export const useJob = (id: string) => {
  const {
    jobs,
    removeJob: removeCurrentJob,
    addExperience: addJobExperience,
    removeExperience: removeJobExperience,
    updateExperience: updateJobExperience,
    dateChanged: jobDateChanged,
    companyNameChanged: jobNameChanged,
    experienceOrderChanged: jobExperienceOrderChanged,
    jobTitleChanged,
  } = useResumeBuilderForm();

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
  const experienceOrderChanged = useCallback(
    (expId: string, newOrdinal: number) =>
      jobExperienceOrderChanged(id, expId, newOrdinal),
    [jobExperienceOrderChanged, id],
  );
  const titleChanged = useCallback(
    (newTitle: string) => jobTitleChanged(id, newTitle),
    [jobTitleChanged, id],
  );

  return {
    job: jobs[id],
    removeJob,
    addExperience,
    removeExperience,
    updateExperience,
    dateChanged,
    companyNameChanged,
    experienceOrderChanged,
    titleChanged,
  };
};
