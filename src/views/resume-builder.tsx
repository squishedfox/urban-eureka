import { ExportIcon, SaveIcon } from "@app/components/icons";
import {
  ResumeBuilderForm,
  type ResumeBuilderFormValue,
  JobListing,
  JobListingSelect,
} from "@app/features";
import { ActionsLayout } from "@app/layouts";
import { AppEventName } from "@core/events";
import { useCallback, useState } from "react";

const ResumeBuilderView = () => {
  const [resume, setResume] = useState<ResumeBuilderFormValue>({
    fullName: "",
    email: "",
    phone: "",
    about: "",
    jobHistory: [],
  });

  const [selectedListing, setSelectedListing] = useState<string>("");

  const resumeChangedHandler = useCallback(
    (newValue: ResumeBuilderFormValue) => {
      setResume(newValue);
    },
    [],
  );

  const saveHandler = useCallback(
    () => window.ipcRenderer.send(AppEventName.SaveResume, resume),
    [resume],
  );

  //<Preview
  //          {...resume}
  //          jobs={resume.jobHistory}
  //          className="p-4 bg-gray-200 overflow-y-scroll border-l border-l-gray-800"
  //        />

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

      <ActionsLayout className="h-16 border border-gray-800 fixed bottom-0 left-0 z-50 bg-white">
        <button type="button">
          <ExportIcon size="lg" />
        </button>
        <button onClick={saveHandler} type="button">
          <SaveIcon size="lg" />
        </button>
      </ActionsLayout>
    </div>
  );
};

export default ResumeBuilderView;
