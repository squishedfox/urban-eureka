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
        label={{
          text: "Full Name",
          icon: {
            name: "circle-user",
            size: "sm",
          },
        }}
        input={{
          name: "fullName",
          type: "text",
          value: fullName,
          onChange: fullNameChanged,
        }}
      />
      <InputGroup
        label={{
          text: "E-Mail",
          icon: {
            name: "email",
            size: "sm",
          },
        }}
        input={{
          name: "email",
          type: "email",
          value: email,
          onChange: emailChanged,
        }}
      />
      <InputGroup
        label={{
          text: "Phone",
          icon: {
            name: "phone",
            size: "sm",
          },
        }}
        input={{
          name: "phone",
          type: "phone",
          value: phone,
          onChange: phoneChanged,
        }}
      />
    </div>
  );
};

export default Contact;
