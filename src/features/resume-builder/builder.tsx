import { IDCardIcon } from "@app/components";
import { classes } from "@app/tokens";
import clsx from "clsx";

import { About, Contact, HistoryList, EducationList } from "./components";
import {
  ResumeBuilderFormProvider,
  ResumeBuilderFormProviderProps,
} from "./context";

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
        className={clsx(classes.forms.default, className)}
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
          <About />
        </fieldset>
        <HistoryList className="space-y-2" />
        <EducationList />
      </form>
    </ResumeBuilderFormProvider>
  );
};

export default ResumeBuilderForm;
