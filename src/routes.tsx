import { Link, Outlet } from "react-router-dom";
import { BriefcaseIcon, CircleInfoIcon, HammerIcon, HomeIcon } from "@app/components/icons";
import { ErrorBoundary } from "@app/components";

export const Layout = () => {
  return (
    <>
      <header className="h-16">
        <nav className="inline-flex space-x-1 px-4 border-b-gray-800 border-b h-full w-full items-center">
          <Link className="px-4 border-r border-gray-800 flex flex-col items-center" to="/">
            <HomeIcon />
            <span className="text-center">Home</span> 
          </Link>
          <Link className="px-4 border-r border-gray-800 flex flex-col items-center" to="/resume-builder">
            <HammerIcon />
            Resume
          </Link>
          <Link className="px-4 border-r border-gray-800 flex flex-col items-center" to="/jobs">
            <BriefcaseIcon />
            Jobs
          </Link>
          <Link className="px-4 border-r border-gray-800 flex flex-col items-center" to="/about">
            <CircleInfoIcon />
            About
          </Link>
        </nav>
      </header>

      <main className="min-h-[calc(100vh-64px)]">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
    </>
  );
};
