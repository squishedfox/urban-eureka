/* eslint-disable jsx-a11y/no-redundant-roles */
import {
  FontAwesomeIcon,
  GithubIcon,
  HammerIcon,
  ReactIcon,
  VimIcon,
  CopyIcon,
  IconButton,
} from "@app/components";
import { CenterLayout } from "@app/layouts";
import { classes } from "@app/tokens";
import clsx from "clsx";
import { useState, type MouseEvent } from "react";

export interface AboutProps {
  className?: string;
}

const About = ({ className }: AboutProps) => {
  const [notification, setNotification] = useState("");
  const [prevTimeout, setPrevTimeout] = useState<number | null>(null);

  const copy = (event: MouseEvent<HTMLButtonElement>) => {
    const copyText = event.currentTarget.innerText;
    navigator.clipboard.writeText(copyText);

    if (prevTimeout !== null) {
      clearTimeout(prevTimeout);
    }

    const timeout = setTimeout(() => {
      setNotification("");
    }, 3000);
    setPrevTimeout(timeout as unknown as number); // no idea why typescript is fighting this
    setNotification(`Copied ${copyText} to clipboard`);
  };

  return (
    <CenterLayout>
      <div className={clsx(classes.container.nested, "bg-white", className)}>
        <h1 className={clsx(classes.headings.h1, classes.container.inline)}>
          <HammerIcon size="lg" />
          <span>Built With</span>
        </h1>
        <div
          role="alert"
          className={clsx("px-2 py-1 min-h-8 w-full", {
            border: !!notification,
            "border-gray-800": !!notification,
          })}
        >
          <p role="alertdialog">
            <strong>{notification}</strong>
          </p>
        </div>
        <div>
          <ul role="list">
            <li className={clsx(classes.container.inline)} role="listitem">
              <FontAwesomeIcon />
              <p>Font Awesome</p>
              <button
                type="button"
                onClick={copy}
                className={classes.buttons.link}
              >
                <span className="border-b border-b-gray-800">
                  https://fontawesome.com/
                </span>
                <CopyIcon />
              </button>
            </li>
            <li className={clsx(classes.container.inline)} role="listitem">
              <ReactIcon />
              <p>React</p>
              <button
                type="button"
                onClick={copy}
                className={classes.buttons.link}
              >
                <span className="border-b border-b-gray-800">
                  https://react.dev/
                </span>
                <CopyIcon />
              </button>
            </li>
            <li className={clsx(classes.container.inline)} role="listitem">
              <p>ElectronJS</p>
              <button
                type="button"
                onClick={copy}
                className={classes.buttons.link}
              >
                <span className="border-b border-b-gray-800">
                  https://www.electronjs.org/
                </span>
                <CopyIcon />
              </button>
            </li>
            <li className={clsx(classes.container.inline)} role="listitem">
              <GithubIcon />
              <p>Github</p>
              <button
                type="button"
                onClick={copy}
                className={classes.buttons.link}
              >
                <span className="border-b border-b-gray-800">
                  https://github.com/squishedfox/urban-eureka
                </span>
                <CopyIcon />
              </button>
            </li>
            <li className={clsx(classes.container.inline)} role="listitem">
              <VimIcon />
              <p>NeoVim</p>
              <button
                type="button"
                onClick={copy}
                className={clsx(
                  classes.buttons.link,
                  "inline-flex items-center",
                )}
              >
                <span className="border-b border-b-gray-800">
                  https://neovim.io/
                </span>
                <CopyIcon />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </CenterLayout>
  );
};
export default About;
