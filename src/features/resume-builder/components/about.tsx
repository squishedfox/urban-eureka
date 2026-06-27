import { useResumeBuilderForm } from "../context";

export interface AboutProps {
  className?: string;
}
const About = ({ className }: AboutProps) => {
  const { about, aboutChanged } = useResumeBuilderForm();

  return (
    <div className={className}>
      <label
        id="about-textarea-label"
        htmlFor="about-textarea"
      >
        About
      </label>
      <textarea
        id="about-textarea"
        name="about-textarea"
        value={about}
        className="border border-gray-800 w-full min-h-32 px-2 py-1"
        onChange={(event) => aboutChanged(event.currentTarget.value)}
      />
    </div>
  );
};
export default About;
