import {
  About,
  HistoryList,
  Contact,
} from "@app/features/resume-builder/components";
import type { ResumeBuilderFormValue } from "@app/features/resume-builder/types";
import { ResumeBuilderFormProvider } from "@app/features/resume-builder/context";
import { IDCardIcon } from "@app/components";

export interface ResumeBuilderFormProps {
  onChange: (formValue: ResumeBuilderFormValue) => void;
}

const ResumeBuilder = ({ onChange }: ResumeBuilderFormProps) => (
  <ResumeBuilderFormProvider onChange={onChange}>
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
);

export default ResumeBuilder;
