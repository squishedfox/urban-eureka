import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center bg-gray-200">
      <div className="flex flex-col items-center justify-center text-center space-y-4 bg-white p-8 border border-gray-800">
        <h1 className="text-xl border-b border-b-gray-800">Welcome</h1>
        <p>Create one resume with all job history, experience, and skills</p>
        <ol className="list-decimal text-left">
          <h2 className="text-l border-b border-b-gray-800 pb-1">
            <strong>How to use this program</strong>
          </h2>
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
        <div role="navigation" className="mt-2">
          <Link
            to="/resume-builder"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 hover:shadow"
          >
            Create resume
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
