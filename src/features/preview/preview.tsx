import { useEventState } from "@app/hooks";
import { AppEventName } from "@core/events";
import { Resume } from "@core/types";
import { useEffect, useState } from "react";

// ad-hoc hook
const usePreview = () => {
  const [eventState, setEventState] = useEventState();
  const [resume, setResume] = useState<Resume | null>();

  useEffect(() => {
    setEventState("fetching");
    const subscribables = [
      window.ipcRenderer.subscribe(
        AppEventName.LoadPreview,
        (resumeData: Resume) => {
          setResume(resumeData);
          setEventState("success");
        },
      ),
    ];

    return () => {
      for (const { unsubscribe } of subscribables) {
        unsubscribe();
      }
    };
  }, [setEventState]);

  return {
    resume,
    eventState,
  };
};

const Preview = () => {
  const { eventState, resume } = usePreview();

  if (eventState === "fetching" || eventState === "pending") {
    return <p>Loading...</p>;
  }

  if (!resume) {
    throw new Error("Failed to load resume");
  }

  return (
    <div className="p-4 space-y-2">
      <section aria-label="contact information">
        <h1 className="text-2xl">{resume.fullName}</h1>
        <p className="text-lg">{resume.email}</p>
        <p className="text-lg">{resume.phone}</p>
      </section>

      <section>
        <h3>
          <strong>About Me</strong>
        </h3>
        <p>{resume.about}</p>
      </section>

      <hr />

      <section>
        <ul>
          <h3>
            <strong>Experience</strong>
          </h3>
          {resume.jobs.map(
            ({ companyName, title, endDate, startDate, experience }, ix) => {
              return (
                <li
                  key={ix}
                  className="min-w-full"
                  aria-labelledby={`${companyName}-${ix}-header`}
                >
                  <div className="flex content-between items-center gap-1">
                    <h2 id={`${companyName}-${ix}-header`}>
                      <strong>{companyName}</strong>
                    </h2>
                    <span className="text-gray-600 text-sm">{title}</span>
                    <hr className="grow" />
                    <div className="inline-flex whitespace-nowrap">
                      <span>{startDate}</span> –{" "}
                      <span>{endDate ? endDate : "Present"}</span>
                    </div>
                  </div>
                  <ul className="ml-6 list-disc">
                    {Object.values(experience)
                      .filter((exp) => !!exp)
                      .map((exp, j) => (
                        <li key={j}>{exp}</li>
                      ))}
                  </ul>
                </li>
              );
            },
          )}
        </ul>
      </section>

      <hr />

      <section aria-labelledby="education-heading">
        <h3 id="education-heading">
          <strong>Education</strong>
        </h3>
        {resume.degrees.length === 0 && resume.certifications.length === 0 ? (
          <p className="text-gray-500 italic">No education listed</p>
        ) : (
          <div className="space-y-2">
            {resume.degrees.length > 0 && (
              <ul className="space-y-1">
                {resume.degrees.map((degree, ix) => (
                  <li key={ix} aria-labelledby={`degree-${ix}-header`}>
                    <div className="flex content-between items-center gap-1">
                      <h4 id={`degree-${ix}-header`}>
                        <strong>{degree.title}</strong>
                      </h4>
                      <hr className="grow" />
                      <span>{degree.graduationYear}</span>
                    </div>
                    <p className="text-gray-600">{degree.institution}</p>
                  </li>
                ))}
              </ul>
            )}

            {resume.certifications.length > 0 && (
              <>
                {resume.degrees.length > 0 && (
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mt-3">
                    Certifications
                  </h4>
                )}
                <ul className="space-y-1">
                  {resume.certifications.map((cert, ix) => (
                    <li key={ix} aria-labelledby={`cert-${ix}-header`}>
                      <div className="flex content-between items-center gap-1">
                        <h4 id={`cert-${ix}-header`}>
                          <strong>{cert.title}</strong>
                        </h4>
                        <hr className="grow" />
                        <div className="inline-flex gap-2 whitespace-nowrap">
                          <span>Issued: {cert.dateIssued}</span>
                          {cert.dateExpires && (
                            <span>Expires: {cert.dateExpires}</span>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-600">{cert.issuer}</p>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </section>
    </div>
  );
};
export default Preview;
