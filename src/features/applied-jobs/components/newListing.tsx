import { ChangeEvent, FormEvent, useState } from "react"
import { JobListing } from "../types"
import { useAddAppliedJob } from "@app/features/applied-jobs/hooks";

const NewJobListing = () => {
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
    window.ipcRenderer.
  }

  const inputChangedHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setFormValue((prev) => Object.assign({}, prev, {
      [event.currentTarget.name]: event.currentTarget.value,
    })) 
  }

  return (<form noValidate onSubmit={submitHandler}>
    <div className="inline-flex">
      <label htmlFor="company-name-input">Company Name</label>
      <input name="companyName"
        id="company-name-input"
        value={formValue.companyName}
        type="text"
        onChange={inputChangedHandler}
        />
    </div>
    <div className="inline-flex space-x-1">
      <button type="button">Cancel</button>
      <button type="submit">Create</button>
    </div>
  </form>)
}

export default NewJobListing;
