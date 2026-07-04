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
import ResumeBuilderForm from "@app/features/resume-builder/builder";

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
    (_: MouseEvent<HTMLButtonElement>) => {
      window.ipcRenderer.send("resume-builder:save", resume);
    },
    [resume],
  );

  return (
    <div>
      <div className="h-[calc(100vh-128px)] overflow-hidden">
        <div className="grid grid-cols-2 h-full overflow-hidden">
          <div className="bg-gray-200 overflow-y-auto">
            <ResumeBuilderForm onChange={resumeChangedHandler} />
          </div>
          <Preview
            {...resume}
            jobs={resume.jobHistory}
            className="p-4 overflow-y-auto"
          />
        </div>
      </div>

      <ActionsLayout className="h-16 border border-gray-800 fixed bottom-0 left-0 z-50">
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
