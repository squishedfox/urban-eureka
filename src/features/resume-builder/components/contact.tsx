import { useResumseBuilderForm } from "../context";
import {
  CircleUserIcon,
  EditableField,
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
  } = useResumseBuilderForm();

  return (
    <div className={className}>
      <EditableField
        type="text"
        label="Full Name"
        name="fullname-input"
        value={fullName}
        onChanged={(value) => fullNameChanged(value as string)}
      >
        <CircleUserIcon size="sm" />
        <strong>{fullName}</strong>
      </EditableField>
      <EditableField
        type="email"
        label="E-Mail"
        name="email-input"
        value={email}
        onChanged={(value) => emailChanged(value as string)}
      >
        <EnvelopeIcon size="sm" />
        <strong>{email}</strong>
      </EditableField>
      <EditableField
        type="phone"
        label="Phone Number"
        name="phone-input"
        value={phone}
        onChanged={(value) => phoneChanged(value as string)}
      >
        <PhoneIcon size="sm" />
        <strong>{phone}</strong>
      </EditableField>
    </div>
  );
};

export default Contact;
