import clsx from "clsx";

export interface PreviewProps {
  className?: string;
  fullName: string;
  email: string;
  phone: string;
  about: string;
  jobs: {
    startDate: string;
    endDate?: string;
    companyName: string;
    experience: string[];
  }[];
}

const Preview = ({
  about,
  fullName,
  email,
  phone,
  jobs,
  className,
}: PreviewProps) => {
  return (
    <div className={clsx(className, "space-y-2")}>
      <section aria-label="contact information">
        <h1 className="text-2xl">{fullName}</h1>
        <p className="text-lg">{email}</p>
        <p className="text-lg">{phone}</p>
      </section>
      <section>
        <h3>
          <strong>About Me</strong>
        </h3>
        <p>{about}</p>
      </section>
      <hr />
      <section>
        <ul>
          <h3>
            <strong>Experience</strong>
          </h3>
          {jobs.map(({ companyName, endDate, startDate, experience }, ix) => {
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
                  <hr className="grow" />
                  <div className="inline-flex">
                    <span>{startDate}</span> -{" "}
                    <span>{endDate ? endDate : "Current"}</span>
                  </div>
                </div>
                <ul className="ml-6 list-disc">
                  {experience
                    .filter((exp) => !!exp)
                    .map((exp, j) => (
                      <li key={j}>{exp}</li>
                    ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

export default Preview;
