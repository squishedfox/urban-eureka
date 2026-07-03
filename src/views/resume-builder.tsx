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
import { classes } from "@app/tokens";
import { ActionsLayout } from "@app/layouts";

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
      <div className="h-[calc(100vh-128px)] overflow-hidden">
        <div className="grid grid-cols-2 h-full overflow-hidden">
          <div className="border-r border-r-gray-800 bg-gray-200 overflow-y-auto">
            <ResumeBuilderFormProvider onChange={resumeChangedHandler}>
              <form name="job-history-form" className={classes.form}>
                <fieldset
                  className="bg-white p-4 border border-gray-800"
                  aria-label="About and Contact Section"
                >
                  <div className="flex">
                    <Contact className="flex flex-col flex-1 space-y-1" />
                    <span>
                      <IDCardIcon />
                    </span>
                  </div>
                  <About className="min-h-32" />
                </fieldset>

                <HistoryList className="space-y-2" />
              </form>
            </ResumeBuilderFormProvider>
          </div>
          <div className="p-4">
            <Preview {...resume} jobs={resume.jobHistory} />
          </div>
        </div>
      </div>

      <ActionsLayout className="h-16 border border-gray-800 fixed bottom-0 left-0 z-50">
        <button>
          <ExportIcon size="lg" />
        </button>
        <button onClick={saveHandler}>
          <SaveIcon size="lg" />
        </button>
      </ActionsLayout>
    </div>
  );
};

export default ResumeBuilderView;
