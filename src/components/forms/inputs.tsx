import { classes } from "@app/tokens";
import clsx from "clsx";
import { ChangeEvent, memo, ReactNode, useCallback } from "react";
import { type HTMLProps, type PropsWithChildren } from "react";

import { Icon, IconName, IconProps } from "../icons";

export interface InputGroupProps {
  /**
   * Should be the label (display text). All translations should be done before
   */
  label: {
    icon?: {
      name: IconName;
      size?: IconProps["size"];
    };
    text: string;
  };

  input: Pick<
    HTMLProps<HTMLInputElement>,
    "name" | "onBlur" | "onFocus" | "type" | "value" | "required"
  > & {
    onChange(newValue: string): Promise<void> | void;
  };
}

export interface TextAreaGroupProps {
  /**
   * Should be the label (display text). All translations should be done before
   */
  label: { icon?: { name: IconName; size?: IconProps["size"] }; text: string };
  /**
   * Icon to display with the label
   */
  icon?: ReactNode;

  textArea: Pick<
    HTMLProps<HTMLTextAreaElement>,
    "name" | "onBlur" | "onFocus" | "type" | "value" | "required"
  > & {
    onChange(newValue: string): Promise<void> | void;
  };
}

export interface LabelProps extends HTMLProps<HTMLLabelElement> {
  /**
   * Icon that will be displayed with the label.
   * The icon will always be displayed to the left of the label in forms.
   */
  icon?: {
    name: IconName;
    size: IconProps["size"];
  };
}

// eslint-disable-next-line react/display-name
export const Label = memo(
  ({ icon, children, ...restProps }: PropsWithChildren<LabelProps>) => {
    if (icon) {
      return (
        <div className="inline-flex space-x-1 items-center">
          <span>{<Icon name={icon.name} size={icon.size} />}</span>
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
  },
);

// eslint-disable-next-line react/display-name
export const InputGroup = memo(({ label, input }: InputGroupProps) => {
  const { onChange, ...restInputProps } = input;

  const changeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value),
    [onChange],
  );

  return (
    <div className={classes.forms.inputGroup.default}>
      <Label
        id={`${input.name}-input-label`}
        icon={
          label.icon
            ? {
                name: label.icon.name,
                size: label.icon.size,
              }
            : undefined
        }
        htmlFor={`${input.name}-input`}
      >
        {label.text}
      </Label>
      <input
        {...restInputProps}
        id={`${input.name}-input`}
        className={classes.forms.input.default}
        onChange={changeHandler}
      />
    </div>
  );
});

// eslint-disable-next-line react/display-name
export const TextAreaGroup = memo(({ label, textArea }: TextAreaGroupProps) => {
  const { onChange, ...restTextAreaProps } = textArea;

  const changeHandler = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => onChange(event.target.value),
    [onChange],
  );
  return (
    <div className={classes.forms.inputGroup.default}>
      <Label
        id={`${textArea.name}-input-label`}
        icon={
          label.icon
            ? {
                name: label.icon.name,
                size: label.icon.size,
              }
            : undefined
        }
        htmlFor={`${textArea.name}-input`}
      >
        {label.text}
      </Label>
      <textarea
        {...restTextAreaProps}
        id={`${textArea.name}-input`}
        className={classes.forms.textarea.default}
        onChange={changeHandler}
      />
    </div>
  );
});

export interface DateRangeInputGroupProps {
  className?: string;
  range: [string, string];
  onChange(range: [string, string]): void;
}

// eslint-disable-next-line react/display-name
export const DateRangeInputGroup = memo(
  ({ className, range, onChange }: DateRangeInputGroupProps) => {
    const [startDate, endDate] = range;
    const startDateChanged = useCallback(
      (newDate: string) => onChange([newDate, endDate]),
      [onChange, endDate],
    );

    const endDateChanged = useCallback(
      (newDate: string) => onChange([startDate, newDate]),
      [onChange, startDate],
    );

    return (
      <div className={clsx("grid grid-cols-2 gap-x-4", className)}>
        <InputGroup
          label={{
            text: "Start Date",
            icon: {
              name: "calendar",
              size: "sm",
            },
          }}
          input={{
            type: "date",
            value: range[0],
            onChange: startDateChanged,
          }}
        />
        <InputGroup
          label={{
            text: "End Date",
            icon: {
              name: "calendar",
              size: "sm",
            },
          }}
          input={{
            type: "date",
            value: range[1],
            onChange: endDateChanged,
          }}
        />
      </div>
    );
  },
);
