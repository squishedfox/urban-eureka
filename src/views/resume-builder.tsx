import { ExportIcon, SaveIcon } from "@app/components/icons";
import {
  ResumeBuilderForm,
  Preview,
  type ResumeBuilderFormValue,
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

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-200">
      <div className="grid grid-cols-2 h-full pb-32">
        <ResumeBuilderForm
          onChange={resumeChangedHandler}
          className="bg-white overflow-y-scroll"
        />
        <Preview {...resume} jobs={resume.jobHistory} className="p-4" />
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
