import { classes } from "@app/tokens";
import clsx from "clsx";
import { PropsWithChildren } from "react";

/**
 * Should be for the actions portion of your form at the bottom
 */
const Actions = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return <div className={clsx(classes.actions, className)}>{children}</div>;
};

export default Actions;
