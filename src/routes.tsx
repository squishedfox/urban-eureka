import { Link, Outlet } from "react-router-dom";
import { ErrorBoundary } from "./components";

export const Layout = () => {
  return (
    <>
      <header className="h-16">
        <nav className="inline-flex space-x-1 px-4 border-b-gray-800 border-b h-full w-full items-center">
          <Link className="px-4 border-r border-gray-800" to="/">
            Home
          </Link>
          <Link className="px-4 border-r border-gray-800" to="/resume-builder">
            Resume Builder
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
