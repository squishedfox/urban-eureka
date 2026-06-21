import { useCallback, useState, type MouseEvent } from "react";
import {
  About,
  HistoryList,
  Contact,
  type ResumeBuilderFormValue,
  ResumeBuilderFormProvider,
} from "@app/features/resume-builder";
import { ExportIcon, IDCardIcon, SaveIcon } from "@app/components/icons";
import { Preview } from "@app/features/preview";
import { ErrorBoundary } from "@app/components";

const ResumeBuilderView = () => {
  const [resume, setResume] = useState<ResumeBuilderFormValue>({
    fullName: "",
    email: "",
    phone: "",
    about: "",
    jobHistory: [],
  });

  const resumeChangedHandler = useCallback(
    (newValue: ResumeBuilderFormValue) => {
      setResume(newValue);
    },
    [],
  );

  const saveHandler = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      console.log("calling");
      window.ipcRenderer.send("resume-builder:save", resume);
    },
    [resume],
  );

  return (
    <div className="pb-16">
      <div className="grid grid-cols-2 overflow-y-hidden">
        <div className="border-r border-r-gray-800 bg-gray-200">
          <ResumeBuilderFormProvider onChange={resumeChangedHandler}>
            <form name="job-history-form" className="space-y-2 overflow-y-scroll px-4 pt-4 pb-16">
              <fieldset
                className="bg-white grid grid-rows-2 p-4 border border-gray-800"
                aria-label="About and Contact Section"
              >
                <div className="flex">
                  <Contact className="flex flex-col flex-1 space-y-1" />
                  <span>
                    <IDCardIcon />
                  </span>
                </div>
                <About />
              </fieldset>
              <fieldset>
                <HistoryList className="space-y-2" />
              </fieldset>
            </form>
          </ResumeBuilderFormProvider>
        </div>
        <div>
          <Preview {...resume} jobs={resume.jobHistory} />
        </div>
      </div>
      <div className="h-16 border border-gray-800 fixed bottom-0 left-0 z-50 w-full flex flex-row-reverse pr-2">
        <button>
          <ExportIcon size="lg" />
        </button>
        <button onClick={saveHandler}>
          <SaveIcon size="lg" />
        </button>
      </div>
    </div>
  );
};

export default ResumeBuilderView;
