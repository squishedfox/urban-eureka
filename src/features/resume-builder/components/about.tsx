import { useResumeBuilderForm } from "../context";
import { EditableTextAreaField } from "@app/components/inputs";

const About = () => {
  const { about, aboutChanged } = useResumeBuilderForm();

  return (
    <EditableTextAreaField
      name="about-input"
      onChanged={aboutChanged}
      value={about}
      placeholder=""
      aria-label="about"
      aria-description="details about yourself"
    >
      <p>{about}</p>
    </EditableTextAreaField>
  );
};
export default About;
