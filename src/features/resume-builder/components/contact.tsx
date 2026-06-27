import { useResumeBuilderForm } from "../context";
import { CircleUserIcon, EnvelopeIcon, PhoneIcon } from "@app/components";

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
      <div className="input-group">
        <label
          id="full-name-input-label"
          htmlFor="full-name-input"
        >
          <CircleUserIcon size="sm" />
          Full name
        </label>
        <input
          id="full-name-input"
          name="full-name-input"
          type="text"
          onChange={(event) => fullNameChanged(event.currentTarget.value)}
          value={fullName}
        />
      </div>
      <div className="input-group">
        <label id="email-input-label" htmlFor="email-input" className="text-xs">

          <EnvelopeIcon size="sm" />
          E-Mail
        </label>
        <input
          id="email-input"
          name="email-input"
          type="email"
          className="border border-gray-800 px-2 py-1"
          onChange={(event) => emailChanged(event.currentTarget.value)}
          value={email}
        />
      </div>
      <div className="input-group">
        <label id="phone-input-label" htmlFor="phone-input">
        <PhoneIcon size="sm" />
          Phone
        </label>
        <input
          id="phone-input"
          name="phone-input"
          type="phone"
          className="border border-gray-800 px-2 py-1"
          onChange={(event) => phoneChanged(event.currentTarget.value)}
          value={phone}
        />
      </div>
    </div>
  );
};

export default Contact;
