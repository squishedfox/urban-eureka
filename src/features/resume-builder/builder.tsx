import { classes } from "@app/tokens";
import {
  ResumeBuilderFormProvider,
  ResumeBuilderFormProviderProps,
} from "@app/features/resume-builder/context";
import {
  About,
  Contact,
  HistoryList,
} from "@app/features/resume-builder/components";
import { IDCardIcon } from "@app/components";

export interface ResumeBuilderFormProps {
  onChange: ResumeBuilderFormProviderProps["onChange"];
}

const ResumeBuilderForm = ({ onChange }: ResumeBuilderFormProps) => {
  return (
    <ResumeBuilderFormProvider onChange={onChange}>
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
  );
};

export default ResumeBuilderForm;
