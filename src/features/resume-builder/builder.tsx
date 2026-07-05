import { IDCardIcon } from "@app/components";
import {
  About,
  Contact,
  HistoryList,
  ResumeBuilderFormProvider,
  ResumeBuilderFormProviderProps,
} from "@app/features";
import { classes } from "@app/tokens";
import clsx from "clsx";

export interface ResumeBuilderFormProps {
  className?: string;
  onChange: ResumeBuilderFormProviderProps["onChange"];
}

const ResumeBuilderForm = ({ className, onChange }: ResumeBuilderFormProps) => {
  return (
    <ResumeBuilderFormProvider onChange={onChange}>
      <form
        noValidate
        method="post"
        action="#"
        className={clsx(classes.form, className)}
      >
        <fieldset
          className="p-4 border border-gray-800"
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
