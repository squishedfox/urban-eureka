import { classes } from "@app/tokens";
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
      <div className="inline-flex space-x-1">
        <span>
          <CircleUserIcon size="sm" />
        </span>
        <label
          id="full-name-input-label"
          htmlFor="full-name-input"
          className={classes.label}
        >
          Full name
        </label>
      </div>
      <div>
        <input
          id="full-name-input"
          name="full-name-input"
          type="text"
          className={classes.input}
          onChange={(event) => fullNameChanged(event.currentTarget.value)}
          value={fullName}
        />
      </div>
      <div className="inline-flex space-x-1">
        <span>
          <EnvelopeIcon size="sm" />
        </span>
        <label
          id="email-input-label"
          htmlFor="email-input"
          className={classes.label}
        >
          E-Mail
        </label>
      </div>
      <div>
        <input
          id="email-input"
          name="email-input"
          type="email"
          className={classes.input}
          onChange={(event) => emailChanged(event.currentTarget.value)}
          value={email}
        />
      </div>
      <div className="inline-flex space-x-1">
        <PhoneIcon size="sm" />
        <label
          id="phone-input-label"
          htmlFor="phone-input"
          className={classes.label}
        >
          Phone
        </label>
      </div>
      <div>
        <input
          id="phone-input"
          name="phone-input"
          type="phone"
          className={classes.input}
          onChange={(event) => phoneChanged(event.currentTarget.value)}
          value={phone}
        />
      </div>
    </div>
  );
};

export default Contact;
