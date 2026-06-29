import { Link, Outlet } from "react-router-dom";
import { BriefcaseIcon, CircleInfoIcon, HammerIcon, HomeIcon } from "@app/components/icons";
import { ErrorBoundary } from "@app/components";

export const Layout = () => {
  return (
    <>
      <header>
        <nav>
          <Link to="/">
            <HomeIcon />
            Home
          </Link>
          <Link to="/resume-builder">
            <HammerIcon />
            Resume
          </Link>
          <Link to="/jobs">
            <BriefcaseIcon />
            Jobs
          </Link>
          <Link to="/about">
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
