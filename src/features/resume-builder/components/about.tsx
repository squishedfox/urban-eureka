import { TextAreaGroup } from "@app/components/forms";

import { useResumeBuilderForm } from "../context";
import { CircleInfoIcon } from "@app/components";

const About = () => {
  const { about, aboutChanged } = useResumeBuilderForm();

  return (
    <TextAreaGroup
      label={{
        text: "About",
        icon: <CircleInfoIcon />,
      }}
      textArea={{
        name: "about",
        value: about,
        onChange: (event) => aboutChanged(event.currentTarget.value),
      }}
    />
  );
};
export default About;
