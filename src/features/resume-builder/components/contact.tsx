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
      <div className="inline-flex w-1/2 space-x-1 items-center">
        <CircleUserIcon size="sm" />
        <EditableInputField
          className="inline-flex w-full space-x-1 items-center"
          type="text"
          aria-label="Full Name"
          name="fullname-input"
          value={fullName}
          onChanged={(value) => fullNameChanged(value as string)}
        >
          <strong>{fullName}</strong>
        </EditableInputField>
      </div>
      <div className="inline-flex w-1/2 space-x-1 items-center">
        <EnvelopeIcon size="sm" />
        <EditableInputField
          className="inline-flex w-full space-x-1 items-center"
          type="email"
          aria-label="E-Mail"
          name="email-input"
          value={email}
          onChanged={(value) => emailChanged(value as string)}
        >
          <strong>{email}</strong>
        </EditableInputField>
      </div>
      <div className="inline-flex w-1/2 space-x-1 items-center">
        <PhoneIcon size="sm" />
        <EditableInputField
          className="inline-flex w-full space-x-1 items-center"
          type="phone"
          aria-label="Phone Number"
          name="phone-input"
          value={phone}
          onChanged={(value) => phoneChanged(value as string)}
        >
          <strong>{phone}</strong>
        </EditableInputField>
      </div>
    </div>
  );
};

export default Contact;
