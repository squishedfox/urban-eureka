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
    experienceIncludeChanged: jobExperienceIncludeChanged,
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

  const experienceIncludeChanged = useCallback(
    (expId: string, include: boolean) => {
      console.log("should be included", include);
      jobExperienceIncludeChanged(id, expId, include);
    },
    [id, jobExperienceIncludeChanged],
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
    experienceIncludeChanged,
    titleChanged,
  };
};

export interface UseExperienceArgs {
  jobId: string;
  experienceId: string;
}
export const useExperience = ({ jobId, experienceId }: UseExperienceArgs) => {
  const {
    job,
    removeExperience: removeJobExperience,
    updateExperience: updateJobExperience,
    experienceOrderChanged: orderJobExperience,
    experienceIncludeChanged: includeExcludeJobExperience,
  } = useJob(jobId);

  const experience = job.experience[experienceId];

  const remove = useCallback(
    () => removeJobExperience(experienceId),
    [experienceId, removeJobExperience],
  );

  const updateText = useCallback(
    (newText: string) => updateJobExperience(experienceId, newText),
    [experienceId, updateJobExperience],
  );

  const reOrder = useCallback(
    (newOrdinal: number) => orderJobExperience(experienceId, newOrdinal),
    [experienceId, orderJobExperience],
  );

  const includeExclude = useCallback(
    (include: boolean) => includeExcludeJobExperience(experienceId, include),
    [experienceId, includeExcludeJobExperience],
  );

  return {
    experience,
    remove,
    updateText,
    reOrder,
    includeExclude,
  };
};
