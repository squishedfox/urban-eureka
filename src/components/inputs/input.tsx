import {
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  useCallback,
  InputHTMLAttributes,
  AriaAttributes,
  PropsWithChildren,
} from "react";
import { CalendarIcon, PencilIcon, XmarkIcon } from "../icons";
import { clsx } from "clsx";

export interface EditableInputFieldProps
  extends
    AriaAttributes,
    Pick<
      InputHTMLAttributes<HTMLInputElement>,
      "type" | "name" | "placeholder" | "className" | "title"
    > {
  value: string | number | undefined;
  /**
   * Callback for when user has changed the value from what was
   * originally passed in.
   */
  onChanged: (value: string) => void;
}

const EditableInputField = ({
  type = "text",
  children = <></>,
  value: valueProp,
  onChanged,
  name,
  placeholder,
  className,
  title,
  ...ariaAttrs
}: PropsWithChildren<EditableInputFieldProps>) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState(valueProp);
  const [isEditing, setIsEditing] = useState(false);

  const handleKeyUp = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      // see https://www.w3.org/TR/uievents-key/#named-key-attribute-values
      if (event.key === "Escape" || event.key === "Cancel") {
        event.preventDefault(); // stop propagation in case we are in a form
        setIsEditing(false);
        setValue(valueProp); // revert back to what the consumer originally had
      }
      if (event.key === "Accept" || event.key === "Execute") {
        event.preventDefault(); // stop propagation in case we are in a form
        setIsEditing(false);
        if (value !== valueProp) {
          onChanged(value as string); // tell the consumer we have made an official change not just clicking to edit and then leaving
        }
      }
    },
    [onChanged, value, valueProp],
  );

  const handleBlur = useCallback(
    (_: FocusEvent<HTMLInputElement>) => {
      setIsEditing(false);
      if (value !== valueProp) {
        onChanged(value as string); // tell the consumer we have made an official change not just clicking to edit and then leaving
      }
    },
    [onChanged, value, valueProp],
  );

  const handleFieldValueChanged = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.currentTarget.value);
    },
    [],
  );

  const editIconClickHandler = useCallback(
    (_: MouseEvent<HTMLButtonElement>) => {
      setIsEditing(true);
      setTimeout(() => {
        // add timeout to let the render turn into an input
        ref.current?.focus();
      }, 100);
    },
    [],
  );

  if (isEditing) {
    return (
      <div className={clsx("inline-flex items-center space-x-1", className)}>
        <input
          className="w-full p-1"
          title={title}
          name={name}
          ref={ref}
          type={type}
          value={value ?? ""}
          onChange={handleFieldValueChanged}
          onKeyUp={handleKeyUp}
          onBlur={handleBlur}
          placeholder={placeholder}
          {...ariaAttrs}
        />
        <button
          type="button"
          onClick={() => setIsEditing(false)}
          title="Click to Cancel"
        >
          <XmarkIcon size="sm" />
        </button>
      </div>
    );
  }

  return (
    <div className={clsx("inline-flex items-center space-x-1", className)}>
      {children}
      <button
        type="button"
        onClick={editIconClickHandler}
        title="Click to edit"
      >
        {type === "date" ? (
          <CalendarIcon size="sm" />
        ) : (
          <PencilIcon size="sm" />
        )}
      </button>
    </div>
  );
};

export default EditableInputField;
