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
          className="text-sm"
        >
          About
        </label>
      </div>
      <div className="h-full">
        <textarea
          id="about-textarea"
          name="about-textarea"
          value={about}
          className="border border-gray-800 w-full"
          onChange={(event) => aboutChanged(event.currentTarget.value)}
        />
      </div>
    </div>
  );
};
export default About;
