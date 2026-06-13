import { ChangeEvent, useCallback } from "react";
import { useResumseBuilderForm } from "../context";

const About = () => {
  const { about, aboutChanged } = useResumseBuilderForm();

  const aboutChangedHandler = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      aboutChanged(event.currentTarget.value);
    },
    [aboutChanged],
  );

  return (
    <div>
      <label htmlFor="about-input" id="about-input-label">
        About
      </label>
      <textarea
        placeholder="1+ years of delivering data driven fatures for well tested applications using <frameworks>"
        className="w-full border border-gray-800 px-1 py-0.5"
        id="about-input"
        name="about"
        value={about}
        onChange={aboutChangedHandler}
        maxLength={500}
        minLength={0}
      />
      <p className="text-gray-500">
        <em>{500 - about.length} characters left</em>
      </p>
    </div>
  );
};
export default About;
