import { classes } from "@app/tokens";

import { useResumeBuilderForm } from "../context";

export interface AboutProps {
  className?: string;
}
const About = ({ className }: AboutProps) => {
  const { about, aboutChanged } = useResumeBuilderForm();

  return (
    <div className={className}>
      <div>
        <label
          id="about-textarea-label"
          htmlFor="about-textarea"
          className={classes.label}
        >
          About
        </label>
      </div>
      <div className="h-full">
        <textarea
          id="about-textarea"
          name="about-textarea"
          value={about}
          className={classes.textarea}
          onChange={(event) => aboutChanged(event.currentTarget.value)}
        />
      </div>
    </div>
  );
};
export default About;
