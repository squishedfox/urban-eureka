import { ChangeEvent, useCallback } from "react";
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

  const nameChangedHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      fullNameChanged(event.currentTarget.value),
    [fullNameChanged],
  );
  const emailChangedHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      emailChanged(event.currentTarget.value),
    [emailChanged],
  );
  const phoneChangedHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      phoneChanged(event.currentTarget.value),
    [phoneChanged],
  );

  return (
    <div className={className}>
      <EditableField
        type="text"
        value={fullName}
        onChanged={(value) => fullNameChanged(value as string)}
      >
        <CircleUserIcon size="sm" />
        <strong>{fullName}</strong>
      </EditableField>
      <EditableField
        type="phone"
        value={email}
        onChanged={(value) => emailChanged(value as string)}
      >
        <EnvelopeIcon size="sm" />
        <strong>{email}</strong>
      </EditableField>
      <EditableField
        type="phone"
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
