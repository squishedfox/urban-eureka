import { ChangeEvent, FormEvent, useState, MouseEvent } from "react"
import { useAddAppliedJob } from "@app/features/applied-jobs/hooks";
import { useNavigate } from "react-router-dom";
import { JobListing } from "@types";

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
  }

  const inputChangedHandler = ({target}: ChangeEvent<HTMLInputElement>) => {
    const value: string|number = target.name === "salary" ? target.valueAsNumber : target.value;
    setFormValue((prev) => Object.assign({}, prev, {
      [target.name]: value,
    })) 
  }

  const cancelClickHandler = (_: MouseEvent<HTMLButtonElement>) => {
    navigate(-1);
  }

  return (<form noValidate onSubmit={submitHandler} className="border border-gray-800 bg-white flex flex-col p-4">
    <div className="py-1 px-2">
      <label className="text-sm" htmlFor="company-name-input">Company Name</label>
      <div>
        <input name="companyName"
          id="company-name-input"
          value={formValue.companyName}
          type="text"
          onChange={inputChangedHandler}
          className="border border-gray-800"
        />
      </div>
    </div>
    <div className="py-1 px-2">
      <label className="text-sm" htmlFor="title-input">Title</label>
      <div>
        <input name="title"
          id="title-input"
          value={formValue.title}
          type="text"
          onChange={inputChangedHandler}
          className="border border-gray-800"
        />
      </div>
    </div>
    <div className="py-1 px-2">
      <label className="text-sm" htmlFor="salary-input">Salary</label>
      <div>
        <input name="salary"
          id="salaray-input"
          value={formValue.salary}
          type="text"
          onChange={inputChangedHandler}
          className="border border-gray-800"
        />
      </div>
    </div>
    <div className="py-1 px-2">
      <label className="text-sm" htmlFor="description-input">Description</label>
      <div>
        <input name="title"
          id="description-input"
          value={formValue.description}
          type="text"
          onChange={inputChangedHandler}
          className="border border-gray-800"
        />
      </div>
    </div>
    <div className="inline-flex space-x-1">
      <button type="button" onClick={cancelClickHandler}>Cancel</button>
      <button type="submit">Create</button>
    </div>
  </form>)
}

export default NewJobListing;
