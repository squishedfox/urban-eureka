import { IconButton } from "@app/components";
import { InputGroup, TextAreaGroup } from "@app/components/forms";
import { useAddAppliedJob } from "@app/features/applied-jobs/hooks";
import { ActionsLayout } from "@app/layouts";
import { classes } from "@app/tokens";
import { type JobListing } from "@core/types";
import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

type NewJobListingFormValue = Omit<JobListing, "salary"> & {
  salary: string;
};

const NewJobListing = () => {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState<NewJobListingFormValue>({
    companyLink: "",
    companyName: "",
    applicationLink: "",
    dateApplied: "",
    salary: "",
    description: "",
    title: "",
    notes: "",
    requirements: "",
    qualifications: "",
  });

  const { addJobListing } = useAddAppliedJob();

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addJobListing({
      title: formValue.title,
      notes: formValue.notes,
      companyLink: formValue.companyLink,
      description: formValue.description,
      companyName: formValue.companyName,
      applicationLink: formValue.applicationLink,
      dateApplied: formValue.dateApplied,
      salary: Number(formValue.salary),
      qualifications: formValue.qualifications,
      requirements: formValue.requirements,
    });
    navigate("/jobs");
  };

  const valueChangedHandler = (field: keyof typeof formValue, text: string) => {
    const value: string | number = field === "salary" ? Number(text) : text;
    setFormValue((prev) =>
      Object.assign({}, prev, {
        [field]: value,
      }),
    );
  };

  return (
    <form noValidate onSubmit={submitHandler} className={classes.forms.default}>
      <fieldset className="space-y-2">
        <InputGroup
          label={{
            text: "Company Name",
            icon: {
              name: "company",
              size: "sm",
            },
          }}
          input={{
            value: formValue.companyName,
            onChange: (value) => valueChangedHandler("companyName", value),
            type: "text",
            name: "companyName",
            required: true,
          }}
        />
        <InputGroup
          label={{
            text: "Date Applied",
            icon: {
              name: "calendar",
              size: "sm",
            },
          }}
          input={{
            value: formValue.dateApplied,
            onChange: (value) => valueChangedHandler("dateApplied", value),
            type: "date",
            name: "dateApplied",
          }}
        />
        <InputGroup
          label={{
            text: "Title",
            icon: {
              name: "title",
              size: "sm",
            },
          }}
          input={{
            value: formValue.title,
            onChange: (value) => valueChangedHandler("title", value),
            type: "text",
            name: "title",
            required: true,
          }}
        />
        <InputGroup
          label={{ text: "Salary", icon: { name: "coins", size: "sm" } }}
          input={{
            value: formValue.salary,
            onChange: (value) => valueChangedHandler("salary", value),
            type: "number",
            name: "salary",
            required: true,
          }}
        />
        <TextAreaGroup
          label={{ text: "Description" }}
          textArea={{
            value: formValue.description,
            onChange: (value) => valueChangedHandler("description", value),
            type: "text",
            name: "description",
            required: true,
          }}
        />
        <TextAreaGroup
          label={{ text: "Requirements" }}
          textArea={{
            value: formValue.requirements,
            onChange: (value) => valueChangedHandler("requirements", value),
            type: "text",
            name: "requirements",
            required: true,
          }}
        />
        <TextAreaGroup
          label={{ text: "Qualifications" }}
          textArea={{
            value: formValue.qualifications,
            onChange: (value) => valueChangedHandler("qualifications", value),
            type: "text",
            name: "qualifications",
            required: true,
          }}
        />
      </fieldset>
      <ActionsLayout>
        <IconButton title="save" iconSize="lg" iconName="save" type="submit" />
        <IconButton
          title="cancel"
          onClick={() => navigate(-1)}
          iconSize="lg"
          iconName="cancel"
        />
      </ActionsLayout>
    </form>
  );
};

export default NewJobListing;
