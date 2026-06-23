import { useResumeBuilderForm } from "../context";
import {
  CircleUserIcon,
  EditableInputField,
  EnvelopeIcon,
  PhoneIcon,
} from "@app/components";

export interface ContactProps {
  className?: string;
}
const Contact = ({ className }: ContactProps) => {
  const {
    fullName,
    fullNameChanged,
    phone,
    phoneChanged,
    email,
    emailChanged,
  } = useResumeBuilderForm();

  return (
    <div className={className}>
      <div className="inline-flex space-x-1">
        <span>
          <CircleUserIcon size="sm" />
        </span>
        <label
          id="full-name-input-label"
          htmlFor="full-name-input"
          className="text-xs"
        >
          Full name
        </label>
      </div>
      <div>
        <input
          id="full-name-input"
          name="full-name-input"
          type="text"
          className="border border-gray-800 px-2 py-1"
          onChange={(event) => fullNameChanged(event.currentTarget.value)}
        />
      </div>
      <div className="inline-flex space-x-1">
        <span>
          <EnvelopeIcon size="sm" />
        </span>
        <label id="email-input-label" htmlFor="email-input" className="text-xs">
          E-Mail
        </label>
      </div>
      <div>
        <input
          id="email-input"
          name="email-input"
          type="email"
          className="border border-gray-800 px-2 py-1"
          onChange={(event) => emailChanged(event.currentTarget.value)}
        />
      </div>
      <div className="inline-flex space-x-1">
        <PhoneIcon size="sm" />
        <label id="phone-input-label" htmlFor="phone-input" className="text-xs">
          Phone
        </label>
      </div>
      <div>
        <input
          id="phone-input"
          name="phone-input"
          type="phone"
          className="border border-gray-800 px-2 py-1"
          onChange={(event) => phoneChanged(event.currentTarget.value)}
        />
      </div>
    </div>
  );
};

export default Contact;
