import { type MouseEvent } from "react";

import { Icon, IconName, IconProps } from "./icons";

export interface IconButtonProps {
  iconName: IconName;
  iconSize?: IconProps["size"];
  title: string;
  type?: HTMLButtonElement["type"];
  onClick?: ((event: MouseEvent<HTMLButtonElement>) => void) | undefined;
}
export const IconButton = ({
  iconName,
  iconSize = "md",
  title,
  type = "button",
  onClick = undefined,
}: IconButtonProps) => (
  <button type={type} onClick={onClick} title={title}>
    <Icon name={iconName} size={iconSize} />
  </button>
);
