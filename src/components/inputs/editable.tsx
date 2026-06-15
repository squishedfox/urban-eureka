import {
  memo,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { PencilIcon, XmarkIcon } from "../icons";

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
    | "week";
  /**
   * Override prop that can be passed to tell component it is in editing state
   */
  isEditing?: boolean;
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
}

const EditableField = ({
  type,
  isEditing: isEditingProp,
  children,
  value: valueProp,
  onChanged,
}: EditableFieldProps) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState(valueProp);
  const [isEditing, setIsEditing] = useState(isEditingProp);

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

  const editIconClickHandler = () => {
    setIsEditing(true);
    setTimeout(() => {
      // add timeout to let the render turn into an input
      ref.current?.focus();
    }, 100);
  };

  useEffect(() => {
    // incase consumer updates editing state to be different than us
    if (isEditingProp !== isEditing) {
      setIsEditing(Boolean(isEditingProp));
    }
  }, [isEditingProp]);

  useEffect(() => {
    // incase soncumser updates the value outside of what we are doing
    if (valueProp !== value) {
      setValue(valueProp);
    }
  }, [valueProp]);

  if (isEditing) {
    return (
      <div className="space-x-1 grow-0 inline-flex items-center">
        <input
          ref={ref}
          type={type}
          value={value ?? ""}
          onChange={handleFieldValueChanged}
          onKeyUp={handleKeyUp}
          onBlur={handleBlur}
        />
        <span onClick={() => setIsEditing(false)}>
          <XmarkIcon size="sm" />
        </span>
      </div>
    );
  }

  return (
    <div className="space-x-1 inline-flex items-center">
      {children}
      <span onClick={editIconClickHandler}>
        <PencilIcon size="sm" />
      </span>
    </div>
  );
};

export default EditableField;
