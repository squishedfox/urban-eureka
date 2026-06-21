import { Link } from "react-router-dom";

const Home = () => (
  <div className="h-[calc(100vh-64px)] flex items-center justify-center">
    <div className="flex flex-col items-center justify-center text-center">
      <h1 className="text-xl">Welcome</h1>
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

export default Home;
