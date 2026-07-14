import { CircleUserIcon, EnvelopeIcon, PhoneIcon } from "@app/components";
import { InputGroup } from "@app/components/forms";
import { watch } from "original-fs";
import { ChangeEvent, useCallback } from "react";

import { useResumeBuilderForm } from "../context";

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

  const fullNameChangeHandler = useCallback(
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
      <InputGroup
        label={{ text: "Full Name", icon: <CircleUserIcon size="sm" /> }}
        input={{
          name: "fullName",
          type: "text",
          value: fullName,
          onChange: fullNameChangeHandler,
        }}
      />
      <InputGroup
        label={{ text: "E-Mail", icon: <EnvelopeIcon size="sm" /> }}
        input={{
          name: "email",
          type: "email",
          value: email,
          onChange: emailChangedHandler,
        }}
      />
      <InputGroup
        label={{ text: "Phone", icon: <PhoneIcon size="sm" /> }}
        input={{
          name: "phone",
          type: "phone",
          value: phone,
          onChange: phoneChangedHandler,
        }}
      />
    </div>
  );
};

export default Contact;
