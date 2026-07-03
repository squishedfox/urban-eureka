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
      <div className="py-1 px-2">
        <label className={classes.label} htmlFor="company-name-input">
          Company Name
        </label>
        <div>
          <input
            name="companyName"
            id="company-name-input"
            value={formValue.companyName}
            type="text"
            onChange={inputChangedHandler}
            className={classes.input}
          />
        </div>
      </div>
      <div className="py-1 px-2">
        <label className={classes.label} htmlFor="title-input">
          Title
        </label>
        <div>
          <input
            name="title"
            id="title-input"
            value={formValue.title}
            type="text"
            onChange={inputChangedHandler}
            className={classes.input}
          />
        </div>
      </div>
      <div className="py-1 px-2">
        <label className={classes.label} htmlFor="salary-input">
          Salary
        </label>
        <div>
          <input
            name="salary"
            id="salaray-input"
            value={formValue.salary}
            type="text"
            onChange={inputChangedHandler}
            className={classes.input}
          />
        </div>
      </div>
      <div className="py-1 px-2">
        <label className={classes.label} htmlFor="description-input">
          Description
        </label>
        <div>
          <textarea
            name="description"
            id="description-input"
            value={formValue.description}
            onChange={textAreaChangedHandler}
            className={classes.textarea}
          />
        </div>
      </div>
      <ActionsLayout>
        <button type="button" onClick={cancelClickHandler} title="cancel">
          <BanIcon size="lg" />
        </button>
        <button type="submit" title="save">
          <SaveIcon size="lg" />
        </button>
      </ActionsLayout>
    </form>
  );
};

export default NewJobListing;
