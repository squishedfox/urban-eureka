import Ban from "@assets/ban.svg";
import Briefcase from "@assets/briefcase.svg";
import Building from "@assets/building.svg";
import Calendar from "@assets/calendar.svg";
import ChevronDown from "@assets/chevron-down.svg";
import ChevronLeft from "@assets/chevron-left.svg";
import ChevronRight from "@assets/chevron-right.svg";
import ChevronUp from "@assets/chevron-up.svg";
import CircleInfo from "@assets/circle-info.svg";
import CircleUser from "@assets/circle-user.svg";
import Coins from "@assets/coins.svg";
import Copy from "@assets/copy.svg";
import Envelope from "@assets/envelope.svg";
import Export from "@assets/export.svg";
import Pdf from "@assets/export.svg";
import FontAwesome from "@assets/font-awesome.svg";
import Hammer from "@assets/hammer.svg";
import Home from "@assets/home.svg";
import IDCard from "@assets/id-card.svg";
import Lock from "@assets/lock.svg";
import PersonCircleExclamation from "@assets/person-circle-exclamation.svg";
import Phone from "@assets/phone.svg";
import Plus from "@assets/plus.svg";
import React from "@assets/react.svg";
import Save from "@assets/save.svg";
import SquarePlus from "@assets/square-plus.svg";
import Tailwindcss from "@assets/tailwindcss.svg";
import Github from "@assets/tailwindcss.svg";
import Trash from "@assets/trash.svg";
import Vim from "@assets/vim.svg";
import Xmark from "@assets/xmark.svg";
import type { AriaAttributes, HTMLAttributes } from "react";

const iconClassSizeMap = {
  xs: "w-2 h-2",
  sm: "w-4 h-4",
  md: "w-8 h-8",
  lg: "w-10 h-10",
  xl: "w-16 h-16",
};
export interface IconProps
  extends AriaAttributes, Omit<HTMLAttributes<HTMLElement>, "src" | "alt"> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}
export interface ChevronIconProps extends IconProps {
  /**
   * Direction the Chevron should be facing
   */
  direction: "up" | "down" | "left" | "right";
}

/**
 * Single Chevron Icon
 */
export const ChevronIcon = ({
  direction,
  size = "md",
  ...restHtmlProps
}: ChevronIconProps) => {
  switch (direction) {
    case "down":
      return (
        <img
          {...restHtmlProps}
          src={ChevronDown}
          className={iconClassSizeMap[size]}
          alt="chevron down"
        />
      );
    case "up":
      return (
        <img
          {...restHtmlProps}
          src={ChevronUp}
          className={iconClassSizeMap[size]}
          alt="chevron up"
        />
      );
    case "left":
      return (
        <img
          {...restHtmlProps}
          src={ChevronLeft}
          className={iconClassSizeMap[size]}
          alt="chevron left"
        />
      );
    case "right":
      return (
        <img
          {...restHtmlProps}
          src={ChevronRight}
          className={iconClassSizeMap[size]}
          alt="chevron right"
        />
      );
    default:
      return null; // you done goofed
  }
};

export const TrashIcon = ({ size = "md" }: IconProps) => (
  <img src={Trash} className={iconClassSizeMap[size]} alt="tash icon" />
);
export const SaveIcon = ({ size = "md" }: IconProps) => (
  <img src={Save} className={iconClassSizeMap[size]} alt="save icon" />
);
export const ExportIcon = ({ size = "md" }: IconProps) => (
  <img src={Export} className={iconClassSizeMap[size]} alt="export icon" />
);
export const PdfIcon = ({ size = "md" }: IconProps) => (
  <img src={Pdf} className={iconClassSizeMap[size]} alt="pdf icon" />
);
export const XmarkIcon = ({ size = "md" }: IconProps) => (
  <img src={Xmark} className={iconClassSizeMap[size]} alt="xmark icon" />
);
export const PlusIcon = ({ size = "md" }: IconProps) => (
  <img src={Plus} className={iconClassSizeMap[size]} alt="plus sign icon" />
);
export const SquarePlusIcon = ({ size = "md" }: IconProps) => (
  <img
    src={SquarePlus}
    className={iconClassSizeMap[size]}
    alt="square plus icon"
  />
);
export const CalendarIcon = ({ size = "md" }: IconProps) => (
  <img src={Calendar} className={iconClassSizeMap[size]} alt="calendar icon" />
);
export const IDCardIcon = ({ size = "md" }: IconProps) => (
  <img src={IDCard} className={iconClassSizeMap[size]} alt="id card icon" />
);
export const EnvelopeIcon = ({ size = "md" }: IconProps) => (
  <img src={Envelope} className={iconClassSizeMap[size]} alt="envelope icon" />
);
export const PhoneIcon = ({ size = "md" }: IconProps) => (
  <img src={Phone} className={iconClassSizeMap[size]} alt="phone icon" />
);
export const CircleUserIcon = ({ size = "md" }: IconProps) => (
  <img
    src={CircleUser}
    className={iconClassSizeMap[size]}
    alt="circle user icon"
  />
);
export const LockIcon = ({ size = "md" }: IconProps) => (
  <img src={Lock} className={iconClassSizeMap[size]} alt="lock icon" />
);
export const BanIcon = ({ size = "md" }: IconProps) => (
  <img src={Ban} className={iconClassSizeMap[size]} alt="ban icon" />
);
export const CircleInfoIcon = ({ size = "md" }: IconProps) => (
  <img
    src={CircleInfo}
    className={iconClassSizeMap[size]}
    alt="circle info icon"
  />
);
export const HomeIcon = ({ size = "md" }: IconProps) => (
  <img src={Home} className={iconClassSizeMap[size]} alt="home icon" />
);
export const HammerIcon = ({ size = "md" }: IconProps) => (
  <img src={Hammer} className={iconClassSizeMap[size]} alt="hammer icon" />
);
export const BriefcaseIcon = ({ size = "md" }: IconProps) => (
  <img
    src={Briefcase}
    className={iconClassSizeMap[size]}
    alt="briefcase icon"
  />
);
export const BuildingIcon = ({ size = "md" }: IconProps) => (
  <img src={Building} className={iconClassSizeMap[size]} alt="building icon" />
);
export const CoinsIcon = ({ size = "md" }: IconProps) => (
  <img src={Coins} className={iconClassSizeMap[size]} alt="coins icon" />
);
export const ReactIcon = ({ size = "md" }: IconProps) => (
  <img src={React} className={iconClassSizeMap[size]} alt="react icon" />
);
export const FontAwesomeIcon = ({ size = "md" }: IconProps) => (
  <img
    src={FontAwesome}
    className={iconClassSizeMap[size]}
    alt="font awesome icon"
  />
);
export const TailwindcssIcon = ({ size = "md" }: IconProps) => (
  <img
    src={Tailwindcss}
    className={iconClassSizeMap[size]}
    alt="tailwind css icon"
  />
);
export const GithubIcon = ({ size = "md" }: IconProps) => (
  <img src={Github} className={iconClassSizeMap[size]} alt="github icon" />
);
export const VimIcon = ({ size = "md" }: IconProps) => (
  <img src={Vim} className={iconClassSizeMap[size]} alt="vim icon" />
);
export const CopyIcon = ({ size = "md" }: IconProps) => (
  <img src={Copy} className={iconClassSizeMap[size]} alt="copy icon" />
);
export const PersonCircleExclamationIcon = ({ size = "md" }: IconProps) => (
  <img
    src={PersonCircleExclamation}
    className={iconClassSizeMap[size]}
    alt="person circle exclamation icon"
  />
);
