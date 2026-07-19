import { ErrorBoundary } from "@app/components";
import {
  BriefcaseIcon,
  CircleInfoIcon,
  HammerIcon,
  HomeIcon,
} from "@app/components/icons";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Link, Outlet } from "react-router-dom";

import {
  LanguageSelector,
  SupportedLanguages,
} from "./components/translations";

export const Layout = () => {
  const { i18n } = useTranslation();
  const onLanguageChanged = (lang: SupportedLanguages) =>
    i18n.changeLanguage(lang);

  return (
    <>
      <header className="h-16">
        <nav className="inline-flex space-x-1 px-4 border-b-gray-800 border-b h-full w-full items-center">
          <Link
            className="px-4 border-r border-gray-800 flex flex-col items-center"
            to="/"
          >
            <HomeIcon />
            <span className="text-center">Home</span>
          </Link>
          <Link
            className="px-4 border-r border-gray-800 flex flex-col items-center"
            to="/resume-builder"
          >
            <HammerIcon />
            Resume
          </Link>
          <Link
            className="px-4 border-r border-gray-800 flex flex-col items-center"
            to="/jobs"
          >
            <BriefcaseIcon />
            Jobs
          </Link>
          <Link
            className="px-4 border-r border-gray-800 flex flex-col items-center"
            to="/about"
          >
            <CircleInfoIcon />
            About
          </Link>
        </nav>
        <div>
          <LanguageSelector onChange={onLanguageChanged} />
        </div>
      </header>

      <main className="min-h-[calc(100vh-64px)]">
        <ErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
    </>
  );
};
