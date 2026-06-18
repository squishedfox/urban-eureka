import {
  AriaAttributes,
  PropsWithChildren,
  TextareaHTMLAttributes,
  useRef,
  useState,
  type KeyboardEvent,
  type FocusEvent,
  type ChangeEvent,
  type MouseEvent,
  useCallback,
} from "react";
import { PencilIcon, XmarkIcon } from "@app/components/icons";
import { clsx } from "clsx";

export interface EditableTextAreaProps
  extends
    AriaAttributes,
    Pick<
      TextareaHTMLAttributes<HTMLTextAreaElement>,
      "className" | "name" | "placeholder"
    > {
  onChanged: (value: string) => void;
  value?: string;
}

const EditableTextArea = ({
  value: valueProp,
  children,
  onChanged,
  name,
  className,
  ...ariaAttrs
}: PropsWithChildren<EditableTextAreaProps>) => {
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const [value, setValue] = useState(valueProp);
  const [isEditing, setIsEditing] = useState(false);

  const handleKeyUp = (event: KeyboardEvent<HTMLTextAreaElement>) => {
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

  const handleBlur = (_: FocusEvent<HTMLTextAreaElement>) => {
    setIsEditing(false);
    if (value !== valueProp) {
      onChanged(value ?? ""); // tell the consumer we have made an official chane not just clicking to edit and then leaving
    }
  };

  const handleFieldValueChanged = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setValue(event.currentTarget.value);
    },
    [],
  );

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
      <div className={clsx(className, "w-full")}>
        <textarea
          className="w-full p-1"
          name={name}
          ref={ref}
          value={value ?? ""}
          onChange={handleFieldValueChanged}
          onKeyUp={handleKeyUp}
          onBlur={handleBlur}
          {...ariaAttrs}
        />
        <button onClick={() => setIsEditing(false)} title="Click to Cancel">
          <XmarkIcon size="sm" />
        </button>
      </div>
    );
  }

  return (
    <div className={className}>
      {children}
      <button onClick={editIconClickHandler} title="Click to edit">
        <PencilIcon size="sm" />
      </button>
    </div>
  );
};

export default EditableTextArea;
