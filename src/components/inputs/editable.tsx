import {
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
  type ReactNode,
  type MouseEvent,
} from "react";
import { CalendarIcon, PencilIcon, XmarkIcon } from "../icons";

export interface EditableFieldProps {
  /**
   * reliably supported types for inputs
   */
  type:
    | "number"
    | "text"
    | "tel"
    | "email"
    | "date"
    | "time"
    | "url"
    | "month"
    | "datetime-local"
    | "week"
    | "phone";
  /**
   * Override prop that can be passed to tell component what the value should be
   * or the initial value
   */
  value: string | number | undefined; // valid types for inputs
  /**
   * Node that is used when not being editied
   */
  children: ReactNode;
  /**
   * Callback for when user has changed the value from what was
   * originally passed in.
   */
  onChanged: (value: string | number) => void;
  /**
   * Must be a unique name for the field in form
   * @example "email-input"
   * @example "phone-input"
   * @example "exp-date-input"
   */
  name: string;
  /**
   * label text for accessability users
   * @example "Phone #"
   * @example "E-Mail"
   * @example "Full Address"
   */
  label: string;
}

const EditableField = ({
  type = "text",
  children = <></>,
  value: valueProp,
  onChanged,
  name,
  label,
}: EditableFieldProps) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState(valueProp);
  const [isEditing, setIsEditing] = useState(false);

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    // see https://www.w3.org/TR/uievents-key/#named-key-attribute-values
    if (event.key === "Escape" || event.key === "Cancel") {
      event.preventDefault(); // stop propegation incase we are in a form
      setIsEditing(false);
      setValue(valueProp); // revert back to what the consumer originally had
    }
    if (event.key === "Accept" || event.key === "Execute") {
      event.preventDefault(); // stop propegation incase we are in a form
      setIsEditing(false);
      if (value !== valueProp) {
        onChanged(value ?? ""); // tell the consumer we have made an official chane not just clicking to edit and then leaving
      }
    }
  };

  const handleBlur = (_: FocusEvent<HTMLInputElement>) => {
    setIsEditing(false);
    if (value !== valueProp) {
      onChanged(value ?? ""); // tell the consumer we have made an official chane not just clicking to edit and then leaving
    }
  };

  const handleFieldValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  const editIconClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsEditing(true);
    setTimeout(() => {
      // add timeout to let the render turn into an input
      ref.current?.focus();
    }, 100);
  };

  if (isEditing) {
    return (
      <div className="space-x-1 grow-0 inline-flex items-center">
        <input
          name={name}
          ref={ref}
          type={type}
          value={value ?? ""}
          onChange={handleFieldValueChanged}
          onKeyUp={handleKeyUp}
          onBlur={handleBlur}
          aria-label={label}
        />
        <button onClick={() => setIsEditing(false)} title="Click to Cancel">
          <XmarkIcon size="sm" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-x-1 inline-flex items-center">
      {children}
      <button onClick={editIconClickHandler} title="Click to edit">
        {type === "date" ? (
          <CalendarIcon size="sm" />
        ) : (
          <PencilIcon size="sm" />
        )}
      </button>
    </div>
  );
};

export default EditableField;
