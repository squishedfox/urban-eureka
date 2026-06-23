import ChevronUp from "@assets/chevron-up.svg";
import ChevronDown from "@assets/chevron-down.svg";
import ChevronRight from "@assets/chevron-right.svg";
import ChevronLeft from "@assets/chevron-left.svg";
import Trash from "@assets/trash.svg";
import Save from "@assets/save.svg";
import Export from "@assets/export.svg";
import Pdf from "@assets/export.svg";
import Xmark from "@assets/xmark.svg";
import Plus from "@assets/plus.svg";
import SquarePlus from "@assets/square-plus.svg";
import Calendar from "@assets/calendar.svg";
import CalendarXMark from "@assets/calendar-xmark.svg";
import IDCard from "@assets/id-card.svg";
import Envelope from "@assets/envelope.svg";
import Phone from "@assets/phone.svg";
import CircleUser from "@assets/circle-user.svg";
import Lock from "@assets/lock.svg";
import Ban from "@assets/ban.svg";

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
  <img src={Trash} className={iconClassSizeMap[size]} />
);
export const SaveIcon = ({ size = "md" }: IconProps) => (
  <img src={Save} className={iconClassSizeMap[size]} />
);
export const ExportIcon = ({ size = "md" }: IconProps) => (
  <img src={Export} className={iconClassSizeMap[size]} />
);
export const PdfIcon = ({ size = "md" }: IconProps) => (
  <img src={Pdf} className={iconClassSizeMap[size]} />
);
export const XmarkIcon = ({ size = "md" }: IconProps) => (
  <img src={Xmark} className={iconClassSizeMap[size]} />
);
export const PlusIcon = ({ size = "md" }: IconProps) => (
  <img src={Plus} className={iconClassSizeMap[size]} />
);
export const SquarePlusIcon = ({ size = "md" }: IconProps) => (
  <img src={SquarePlus} className={iconClassSizeMap[size]} />
);
export const CalendarIcon = ({ size = "md" }: IconProps) => (
  <img src={Calendar} className={iconClassSizeMap[size]} />
);
export const CalendarXMarkIcon = ({ size = "md" }: IconProps) => (
  <img src={CalendarXMark} className={iconClassSizeMap[size]} />
);
export const IDCardIcon = ({ size = "md" }: IconProps) => (
  <img src={IDCard} className={iconClassSizeMap[size]} />
);
export const EnvelopeIcon = ({ size = "md" }: IconProps) => (
  <img src={Envelope} className={iconClassSizeMap[size]} />
);
export const PhoneIcon = ({ size = "md" }: IconProps) => (
  <img src={Phone} className={iconClassSizeMap[size]} />
);
export const CircleUserIcon = ({ size = "md" }: IconProps) => (
  <img src={CircleUser} className={iconClassSizeMap[size]} />
);
export const LockIcon = ({ size = "md" }: IconProps) => (
  <img src={Lock} className={iconClassSizeMap[size]} />
);
export const BanIcon = ({ size = "md" }: IconProps) => (
  <img src={Ban} className={iconClassSizeMap[size]} />
);
