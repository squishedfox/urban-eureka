import { classes } from "@app/tokens";
import clsx from "clsx";
import { memo, ReactNode } from "react";
import { type HTMLProps, type PropsWithChildren } from "react";

import { CalendarIcon } from "../icons";

export interface InputGroupProps {
  /**
   * Should be the label (display text). All translations should be done before
   */
  label: { icon?: ReactNode; text: string };

  input: Pick<
    HTMLProps<HTMLInputElement>,
    "name" | "onChange" | "onBlur" | "onFocus" | "type" | "value" | "required"
  >;
}

export interface TextAreaGroupProps {
  /**
   * Should be the label (display text). All translations should be done before
   */
  label: { icon?: ReactNode; text: string };
  /**
   * Icon to display with the label
   */
  icon?: ReactNode;

  textArea: Pick<
    HTMLProps<HTMLTextAreaElement>,
    "name" | "onChange" | "onBlur" | "onFocus" | "type" | "value" | "required"
  >;
}

export interface LabelProps extends HTMLProps<HTMLLabelElement> {
  /**
   * Icon that will be displayed with the label.
   * The icon will always be displayed to the left of the label in forms.
   */
  icon?: ReactNode;
}

export const Label = ({
  icon,
  children,
  ...restProps
}: PropsWithChildren<LabelProps>) => {
  if (icon) {
    return (
      <div className="inline-flex space-x-1 items-center">
        <span>{icon}</span>
        <label {...restProps} className={classes.forms.label.default}>
          {children}
        </label>
      </div>
    );
  }

  return (
    <label {...restProps} className={classes.forms.label.default}>
      {children}
    </label>
  );
};

export const InputGroup = ({ label, input }: InputGroupProps) => {
  return (
    <div className={classes.forms.inputGroup.default}>
      <Label
        id={`${input.name}-input-label`}
        icon={label.icon}
        htmlFor={`${input.name}-input`}
      >
        {label.text}
      </Label>
      <input
        {...input}
        id={`${input.name}-input`}
        className={classes.forms.input.default}
      />
    </div>
  );
};

export const TextAreaGroup = ({ label, textArea }: TextAreaGroupProps) => {
  return (
    <div className={classes.forms.inputGroup.default}>
      <Label
        id={`${textArea.name}-input-label`}
        icon={label.icon}
        htmlFor={`${textArea.name}-input`}
      >
        {label.text}
      </Label>
      <textarea
        {...textArea}
        id={`${textArea.name}-input`}
        className={classes.forms.textarea.default}
      />
    </div>
  );
};

export interface DateRangeInputGroupProps {
  className?: string;
  range: [string, string];
  onChange(range: [string, string]): void;
}

export const DateRangeInputGroup = ({
  className,
  range,
  onChange,
}: DateRangeInputGroupProps) => (
  <div className={clsx("grid grid-cols-2 gap-x-4", className)}>
    <InputGroup
      label={{
        text: "Start Date",
        icon: <CalendarIcon size="sm" />,
      }}
      input={{
        type: "date",
        value: range[0],
        onChange: (event) => onChange([event.currentTarget.value, range[1]]),
      }}
    />
    <InputGroup
      label={{
        text: "End Date",
        icon: <CalendarIcon size="sm" />,
      }}
      input={{
        type: "date",
        value: range[1],
        onChange: (event) => onChange([range[0], event.currentTarget.value]),
      }}
    />
  </div>
);
