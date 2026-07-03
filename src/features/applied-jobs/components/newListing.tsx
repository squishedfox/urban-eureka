import {
  type ChangeEvent,
  type FormEvent,
  type MouseEvent,
  useState,
} from "react";
import { useAddAppliedJob } from "@app/features/applied-jobs/hooks";
import { useNavigate } from "react-router-dom";
import { type JobListing } from "@core/types";
import { classes } from "@app/tokens";
import { BanIcon, SaveIcon } from "@app/components";
import { ActionsLayout } from "@app/layouts";
import { InputGroup, TextAreaGroup } from "@app/components/forms";
import { faker } from "@faker-js/faker";

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

  const cancelClickHandler = (_: MouseEvent<HTMLButtonElement>) => {
    navigate(-1);
  };

  return (
    <form noValidate onSubmit={submitHandler} className={classes.form}>
      <fieldset>
        <InputGroup
          label={{ text: "Company Name" }}
          input={{
            value: formValue.companyName,
            onChange: inputChangedHandler,
            type: "text",
            name: "companyName",
            required: true,
          }}
        />
        <InputGroup
          label={{ text: "Title" }}
          input={{
            value: formValue.title,
            onChange: inputChangedHandler,
            type: "text",
            name: "title",
            required: true,
          }}
        />
        <InputGroup
          label={{ text: "Salary" }}
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
      </fieldset>
      <ActionsLayout>
        <button type="submit" title="save">
          <SaveIcon size="lg" />
        </button>
        <button type="button" onClick={cancelClickHandler} title="cancel">
          <BanIcon size="lg" />
        </button>
      </ActionsLayout>
    </form>
  );
};

export default NewJobListing;
