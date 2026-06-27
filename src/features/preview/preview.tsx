export interface PreviewProps {
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

const Preview = ({ about, fullName, email, phone, jobs }: PreviewProps) => {
  return (
    <div className="space-y-4">
      <section aria-label="contact information">
        <h1>{fullName}</h1>
        <p>{email}</p>
        <p>{phone}</p>
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
                <ul>
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
