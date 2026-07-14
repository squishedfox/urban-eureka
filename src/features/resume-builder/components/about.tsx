import { CircleInfoIcon } from "@app/components";
import { TextAreaGroup } from "@app/components/forms";
import { ChangeEvent, useCallback } from "react";

import { useResumeBuilderForm } from "../context";

const About = () => {
  const { about, aboutChanged } = useResumeBuilderForm();

  const changeHandler = useCallback(
    ({ currentTarget }: ChangeEvent<HTMLTextAreaElement>) => {
      aboutChanged(currentTarget.value);
    },
    [aboutChanged],
  );

  return (
    <TextAreaGroup
      label={{
        text: "About",
        icon: <CircleInfoIcon />,
      }}
      textArea={{
        name: "about",
        value: about,
        onChange: changeHandler,
      }}
    />
  );
};
export default About;
