import { ResumeBuilder, Preview } from "@app/features";
import { SaveIcon, ExportIcon } from "@app/components/icons";
import { useCallback, useState, type MouseEvent } from "react";
import { type ResumeBuilderFormValue } from "./features/resume-builder/types";

const App = () => {
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
      window.ipcRenderer.send("resume-builder:save", resume);
    },
    [resume],
  );

  return (
    <div className="h-screen">
      <main className="flex pb-16 h-full">
        <div className="border-r border-r-gray-800 bg-gray-200 flex-1 h-full px-4 pt-4 overflow-y-scroll">
          <ResumeBuilder onChange={resumeChangedHandler} />
        </div>
        <div className="flex-1 h-full px-4 pt-4 overflow-y-scroll">
          <Preview {...resume} jobs={resume.jobHistory} />
        </div>
      </main>
      <footer className="h-16 border border-gray-800 fixed bottom-0 left-0 z-50 w-full flex flex-row-reverse pr-2">
        <button>
          <ExportIcon size="lg" />
        </button>
        <button>
          <SaveIcon onClick={saveHandler} size="lg" />
        </button>
      </footer>
    </div>
  );
};

export default App;
