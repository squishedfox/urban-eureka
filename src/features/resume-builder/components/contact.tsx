import { CircleUserIcon, EnvelopeIcon, PhoneIcon } from "@app/components";
import { InputGroup } from "@app/components/forms";

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

  return (
    <div className={className}>
      <InputGroup
        label={{ text: "Full Name", icon: <CircleUserIcon size="sm" /> }}
        input={{
          name: "fullName",
          type: "text",
          value: fullName,
          onChange: (event) => fullNameChanged(event.currentTarget.value),
        }}
      />
      <InputGroup
        label={{ text: "E-Mail", icon: <EnvelopeIcon size="sm" /> }}
        input={{
          name: "email",
          type: "email",
          value: email,
          onChange: (event) => emailChanged(event.currentTarget.value),
        }}
      />
      <InputGroup
        label={{ text: "Phone", icon: <PhoneIcon size="sm" /> }}
        input={{
          name: "phone",
          type: "phone",
          value: phone,
          onChange: (event) => phoneChanged(event.currentTarget.value),
        }}
      />
    </div>
  );
};

export default Contact;
