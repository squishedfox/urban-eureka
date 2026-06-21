import { ErrorBoundary } from "@app/components";
import { Link } from "react-router-dom";

const Home = () => (
  <ErrorBoundary>
    <div className="min-h-screen min-w-screen items-center justify-center flex flex-col">
      <h1 className="text-xl">Welcome</h1>
      <div role="navigation">
        <Link
          to="/resume-builder"
          className="mt-2 inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 hover:shadow"
        >
          Create resume
        </Link>
      </div>
    </div>
  </ErrorBoundary>
);

export default Home;
