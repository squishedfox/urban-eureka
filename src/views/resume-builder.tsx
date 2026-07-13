import { ExportIcon, EyeIcon, SaveIcon } from "@app/components/icons";
import {
  ResumeBuilderForm,
  type ResumeBuilderFormValue,
  JobListingSelect,
  JobListing,
} from "@app/features";
import { ActionsLayout } from "@app/layouts";
import { AppEventName } from "@core/events";
import { Resume } from "@core/types";
import { useState } from "react";

const ResumeBuilderView = () => {
  const [resume, setResume] = useState<Resume>({
    fullName: "",
    email: "",
    phone: "",
    about: "",
    jobs: [],
    degrees: [],
    certifications: [],
  });

  const [selectedListing, setSelectedListing] = useState<string>("");

  const saveHandler = () => {
    window.ipcRenderer.send(AppEventName.SaveResume, resume);
  };

  const showPreviewHandler = () => {
    window.ipcRenderer.send(AppEventName.ShowPreviewWindow, resume);
  };

  const resumeChangedHandler = ({
    jobs,
    certifications,
    degrees,
    fullName,
    phone,
    email,
    about,
  }: ResumeBuilderFormValue) => {
    setResume({
      jobs: jobs.map((job) => ({
        title: job.title,
        companyName: job.companyName,
        startDate: job.startDate,
        endDate: job.endDate,
        experience: Object.values(job.experience)
          .filter((job) => Boolean(job.included))
          .map((exp) => exp.text),
      })),
      certifications,
      fullName,
      phone,
      email,
      about,
      degrees,
    });
  };

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="grid grid-cols-2 h-full pb-32">
        <ResumeBuilderForm
          onChange={resumeChangedHandler}
          className="bg-white overflow-y-scroll border-none"
        />
        <div className="p-4 bg-gray-200 overflow-y-scroll border-l border-l-gray-800 space-y-1">
          <JobListingSelect onChange={([id]) => setSelectedListing(id)} />
          {selectedListing ? (
            <JobListing
              jobListingId={selectedListing}
              className="bg-white p-4 border border-gray-800"
            />
          ) : (
            <p>
              Select a job listing from the options to see how your resume
              compares
            </p>
          )}
        </div>
      </div>

      <ActionsLayout className="h-16 border border-gray-800 fixed bottom-0 left-0 z-50">
        <button type="button">
          <ExportIcon size="lg" />
        </button>
        <button onClick={saveHandler} type="button">
          <SaveIcon size="lg" />
        </button>
        <button type="button" onClick={showPreviewHandler}>
          <EyeIcon size="lg" />
        </button>
      </ActionsLayout>
    </div>
  );
};

export default ResumeBuilderView;
