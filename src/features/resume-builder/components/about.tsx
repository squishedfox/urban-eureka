import { useResumseBuilderForm } from "../context";
import EditableTextArea from "@app/components/inputs/textarea";

const About = () => {
  const { about, aboutChanged } = useResumseBuilderForm();

  return (
    <EditableTextArea
      name="about-input"
      onChanged={aboutChanged}
      value={about}
      placeholder=""
      aria-label="about"
      aria-description="details about yourself"
    >
      <p>{about}</p>
    </EditableTextArea>
  );
};
export default About;
