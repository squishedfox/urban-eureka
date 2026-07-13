import { TextAreaGroup } from "@app/components/forms";

import { useResumeBuilderForm } from "../context";

const About = () => {
  const { about, aboutChanged } = useResumeBuilderForm();

  return (
    <TextAreaGroup
      label={{
        text: "About",
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
