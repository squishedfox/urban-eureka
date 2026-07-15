import { TextAreaGroup } from "@app/components/forms";

import { useResumeBuilderForm } from "../context";

const About = () => {
  const { about, aboutChanged } = useResumeBuilderForm();

  return (
    <TextAreaGroup
      label={{
        text: "About",
        icon: {
          name: "circle-info",
        },
      }}
      textArea={{
        name: "about",
        value: about,
        onChange: aboutChanged,
      }}
    />
  );
};
export default About;
