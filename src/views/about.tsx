import {
  FontAwesomeIcon,
  GithubIcon,
  HammerIcon,
  ReactIcon,
  VimIcon,
} from "@app/components";
import { CenterLayout } from "@app/layouts";
import { classes } from "@app/tokens";
import clsx from "clsx";

export interface AboutProps {
  className?: string;
}

const About = ({ className }: AboutProps) => (
  <CenterLayout>
    <div className={clsx(classes.container.nested, "bg-white", className)}>
      <h1 className={classes.headings.h1}>
        <HammerIcon size="lg" /> Built With
      </h1>
      <div>
        <ul>
          <li className="inline-flex items-center w-full space-x-1">
            <FontAwesomeIcon />
            <div>Font Awesome</div>
            <a href="https://fontawesome.com/" target="_blank" rel="noreferrer">
              https://fontawesome.com/
            </a>
          </li>
          <li className="inline-flex items-center w-full space-x-1">
            <ReactIcon />
            <div>React</div>
            <a href="https://react.dev/" target="_blank" rel="noreferrer">
              https://react.dev/
            </a>
          </li>
          <li className="inline-flex items-center w-full space-x-1">
            ElectronJS
            <a
              href="https://www.electronjs.org/"
              target="_blank"
              rel="noreferrer"
            >
              https://www.electronjs.org/
            </a>
          </li>
          <li className="inline-flex items-center w-full space-x-1">
            <GithubIcon />
            Github
            <a
              href="https://github.com/squishedfox/urban-eureka"
              target="_blank"
              rel="noreferrer"
            >
              https://github.com/squishedfox/urban-eureka
            </a>
          </li>
          <li className="inline-flex items-center w-full space-x-1">
            <VimIcon />
            NeoVim
            <a href="https://neovim.io/" target="_blank" rel="noreferrer">
              https://neovim.io/
            </a>
          </li>
        </ul>
      </div>
    </div>
  </CenterLayout>
);
export default About;
