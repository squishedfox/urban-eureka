import { classes } from "@app/tokens";
import { ReactNode } from "react";
import { type HTMLProps, type PropsWithChildren } from "react";

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
        <label {...restProps} className={classes.label}>
          {children}
        </label>
      </div>
    );
  }

  return (
    <label {...restProps} className={classes.label}>
      {children}
    </label>
  );
};

export const InputGroup = ({ label, input }: InputGroupProps) => {
  return (
    <div className={classes.inputGroup}>
      <Label
        id={`${input.name}-input-label`}
        icon={label.icon}
        htmlFor={`${input.name}-input`}
      >
        {label.text}
      </Label>
      <input {...input} id={`${input.name}-input`} className={classes.input} />
    </div>
  );
};

export const TextAreaGroup = ({ label, textArea }: TextAreaGroupProps) => {
  return (
    <div className={classes.inputGroup}>
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
        className={classes.textarea}
      />
    </div>
  );
};
