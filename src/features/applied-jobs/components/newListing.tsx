import {
  BanIcon,
  BuildingIcon,
  CalendarIcon,
  CoinsIcon,
  PersonCircleExclamationIcon,
  SaveIcon,
} from "@app/components";
import { InputGroup, TextAreaGroup } from "@app/components/forms";
import { useAddAppliedJob } from "@app/features/applied-jobs/hooks";
import { ActionsLayout } from "@app/layouts";
import { classes } from "@app/tokens";
import { type JobListing } from "@core/types";
import { type ChangeEvent, type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const NewJobListing = () => {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState<JobListing>({
    companyLink: "",
    companyName: "",
    applicationLink: "",
    dateApplied: "",
    salary: 0,
    description: "",
    title: "",
    notes: "",
    requirements: "",
    qualifications: "",
  });

  const { addJobListing } = useAddAppliedJob();

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addJobListing(formValue);
    navigate("/jobs");
  };

  const inputChangedHandler = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const value: string | number =
      target.name === "salary" ? target.valueAsNumber : target.value;
    setFormValue((prev) =>
      Object.assign({}, prev, {
        [target.name]: value,
      }),
    );
  };

  const textAreaChangedHandler = ({
    target,
  }: ChangeEvent<HTMLTextAreaElement>) => {
    setFormValue((prev) =>
      Object.assign({}, prev, {
        [target.name]: target.value,
      }),
    );
  };

  return (
    <form noValidate onSubmit={submitHandler} className={classes.form}>
      <fieldset className="space-y-2">
        <InputGroup
          label={{ text: "Company Name", icon: <BuildingIcon size="sm" /> }}
          input={{
            value: formValue.companyName,
            onChange: inputChangedHandler,
            type: "text",
            name: "companyName",
            required: true,
          }}
        />
        <InputGroup
          label={{ text: "Date Applied", icon: <CalendarIcon size="sm" /> }}
          input={{
            value: formValue.dateApplied,
            onChange: inputChangedHandler,
            type: "date",
            name: "dateApplied",
          }}
        />
        <InputGroup
          label={{
            text: "Title",
            icon: <PersonCircleExclamationIcon size="sm" />,
          }}
          input={{
            value: formValue.title,
            onChange: inputChangedHandler,
            type: "text",
            name: "title",
            required: true,
          }}
        />
        <InputGroup
          label={{ text: "Salary", icon: <CoinsIcon size="sm" /> }}
          input={{
            value: formValue.salary,
            onChange: inputChangedHandler,
            type: "number",
            name: "salary",
            required: true,
          }}
        />
        <TextAreaGroup
          label={{ text: "Description" }}
          textArea={{
            value: formValue.description,
            onChange: textAreaChangedHandler,
            type: "text",
            name: "description",
            required: true,
          }}
        />
        <TextAreaGroup
          label={{ text: "Requirements" }}
          textArea={{
            value: formValue.requirements,
            onChange: textAreaChangedHandler,
            type: "text",
            name: "requirements",
            required: true,
          }}
        />
        <TextAreaGroup
          label={{ text: "Qualifications" }}
          textArea={{
            value: formValue.qualifications,
            onChange: textAreaChangedHandler,
            type: "text",
            name: "qualifications",
            required: true,
          }}
        />
      </fieldset>
      <ActionsLayout>
        <button type="submit" title="save">
          <SaveIcon size="lg" />
        </button>
        <button type="button" onClick={() => navigate(-1)} title="cancel">
          <BanIcon size="lg" />
        </button>
      </ActionsLayout>
    </form>
  );
};

export default NewJobListing;
