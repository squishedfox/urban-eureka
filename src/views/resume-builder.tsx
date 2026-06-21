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
    <ErrorBoundary>
      <div className="h-screen">
        <main className="flex pb-16 h-full">
          <div className="border-r border-r-gray-800 bg-gray-200 flex-1 h-full px-4 pt-4 overflow-y-scroll">
            <ResumeBuilderFormProvider onChange={resumeChangedHandler}>
              <form name="job-history-form" className="space-y-2">
                <fieldset
                  className="min-w-full border border-gray-800 bg-white p-2 space-y-2"
                  aria-label="About and Contact Section"
                >
                  <span className="float-right">
                    <IDCardIcon />
                  </span>
                  <Contact className="flex flex-col space-y-1" />
                  <About />
                </fieldset>
                <fieldset>
                  <HistoryList className="space-y-2" />
                </fieldset>
              </form>
            </ResumeBuilderFormProvider>
          </div>
          <div className="flex-1 h-full px-4 pt-4 overflow-y-scroll">
            <Preview {...resume} jobs={resume.jobHistory} />
          </div>
        </main>
        <footer className="h-16 border border-gray-800 fixed bottom-0 left-0 z-50 w-full flex flex-row-reverse pr-2">
          <button>
            <ExportIcon size="lg" />
          </button>
          <button onClick={saveHandler}>
            <SaveIcon size="lg" />
          </button>
        </footer>
      </div>
    </ErrorBoundary>
  );
};

export default ResumeBuilderView;
