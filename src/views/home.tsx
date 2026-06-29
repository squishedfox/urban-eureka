import { BanIcon, LockIcon } from "@app/components";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="center">
      <div className="container">
        <div>
          <div>
            <h1>Welcome</h1>
            <p>
              Create one resume with all job history, experience, and skills
            </p>
          </div>
          <ol style={{ width: "100%" }}>
            <h2>How to use this program</h2>
            <li>
              <p>Create your full resume</p>
            </li>
            <li>
              <p>
                Add or remove resume criteria to match the job description by
                (un)checking the box
              </p>
            </li>
            <li>
              <p>
                <em>(Optional)</em> Save resume for reviewing later
              </p>
            </li>
            <li>
              <p>
                <em>(Optional)</em> Save the job and review it later
              </p>
            </li>
          </ol>
          <div role="navigation" className="center">
            <Link to="/resume-builder" className="button">
              Create resume
            </Link>
          </div>
          <div>
            <div className="action-group">
              <LockIcon />
              <p>Your program, your data.</p>
            </div>
            <div className="action-group">
              <BanIcon />
              <p>No Tracking. No data sharing.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
