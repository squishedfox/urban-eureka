import { Degrees } from "@core/types";

import { useResumeBuilderForm } from "../context";

/* eslint-disable jsx-a11y/no-redundant-roles */
export interface EducationListProps {
  className?: string;
}
const EducationList = ({ className }: EducationListProps) => {
  const { degrees, certifications } = useResumeBuilderForm();

  return (
    <ul role="list" className={className}>
      {Object.entries(degrees).map(([degId, degree]: [string, Degrees]) => (
        <li key={degId} role="listitem">{degree.titlekj:
        }</li>
      ))}
    </ul>
  );
};

export default EducationList;
