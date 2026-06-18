import { useResumseBuilderForm } from "../context";
import EditableTextArea from "@app/components/inputs/textarea";

const About = () => {
  const { about, aboutChanged } = useResumseBuilderForm();

  return (
    <EditableTextArea
      name="about-input"
      onChanged={aboutChanged}
      value={about}
      placeholder="Battle tested developer with years of experience shipping well tested products and delivering increased customer value"
      aria-label="about"
      aria-description="details about yourself"
    >
      <p>{about}</p>
    </EditableTextArea>
  );
};
export default About;
