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
import { classes } from "./tokens";

export const Layout = () => {
  const { i18n } = useTranslation();
  const onLanguageChanged = (lang: SupportedLanguages) =>
    i18n.changeLanguage(lang);

  return (
    <>
      <header className="h-16 flex justify-between">
        <nav className={classes.nav.default}>
          <Link className={classes.nav.link} to="/">
            <HomeIcon />
            <span className="text-center">Home</span>
          </Link>
          <Link className={classes.nav.link} to="/resume-builder">
            <HammerIcon />
            Resume
          </Link>
          <Link className={classes.nav.link} to="/jobs">
            <BriefcaseIcon />
            Jobs
          </Link>
          <Link className={classes.nav.link} to="/about">
            <CircleInfoIcon />
            About
          </Link>
        </nav>
        <div className="flex px-4">
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
