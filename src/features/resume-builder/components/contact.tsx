import { ChangeEvent } from "react";
import { useResumseBuilderForm } from "../context";

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

  const nameChangedHandler = (event: ChangeEvent<HTMLInputElement>) =>
    fullNameChanged(event.currentTarget.value);
  const emailChangedHandler = (event: ChangeEvent<HTMLInputElement>) =>
    emailChanged(event.currentTarget.value);
  const phoneChangedHandler = (event: ChangeEvent<HTMLInputElement>) =>
    phoneChanged(event.currentTarget.value);

  return (
    <div className={className}>
      <div>
        <label htmlFor="full-name-input" id="full-name-input-label">
          Full Name
        </label>
        <div>
          <input
            id="full-name-input"
            type="text"
            value={fullName}
            onChange={nameChangedHandler}
            className="border border-gray-800 px-1 py-0.5"
            required
          />
        </div>
      </div>
      <div>
        <label htmlFor="email-input" id="email-input-label">
          E-mail
        </label>
        <div>
          <input
            id="email-input"
            type="email"
            value={email}
            onChange={emailChangedHandler}
            className="border border-gray-800 px-1 py-0.5"
            required
          />
        </div>
      </div>
      <div>
        <label htmlFor="phone-input" id="phone-input-label">
          Phone (Recommended)
        </label>
        <div>
          <input
            id="phone-input"
            type="phone"
            value={phone}
            onChange={phoneChangedHandler}
            className="border border-gray-800 px-1 py-0.5"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
