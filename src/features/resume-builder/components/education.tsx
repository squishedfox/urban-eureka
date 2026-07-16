import { IconButton } from "@app/components";
import { InputGroup } from "@app/components/forms";
import { classes } from "@app/tokens";
import { Certification, Degrees } from "@core/types";

import { useResumeBuilderForm } from "../context";

export interface DegreeFieldsetsProps {
  className?: string;
}

export const DegreeFieldsets = ({ className }: DegreeFieldsetsProps) => {
  const { degrees, updateDegree, removeDegree } = useResumeBuilderForm();

  return (
    <div className={className}>
      {Object.entries(degrees).map(([degId, degree]: [string, Degrees]) => (
        <fieldset key={degId} className={classes.forms.fieldsets.default}>
          <legend className={classes.forms.fieldsets.legend}>
            Degree Item
          </legend>
          <div className="inline-flex w-full justify-end">
            <IconButton
              title={`Delete ${degree.title} from resume`}
              onClick={() => removeDegree(degId)}
              iconSize="sm"
              iconName="trash"
            />
          </div>
          <InputGroup
            label={{
              icon: {
                name: "title",
                size: "sm",
              },
              text: "Title",
            }}
            input={{
              name: "title",
              value: degree.title,
              onChange: (newTitle: string) =>
                updateDegree(degId, "title", newTitle),
            }}
          />
          <InputGroup
            label={{
              icon: {
                name: "company",
                size: "sm",
              },
              text: "Institution",
            }}
            input={{
              name: "institution",
              value: degree.institution,
              onChange: (newInstitution) =>
                updateDegree(degId, "institution", newInstitution),
            }}
          />
          <InputGroup
            label={{
              icon: {
                name: "calendar",
                size: "sm",
              },
              text: "Graduation Year",
            }}
            input={{
              type: "date",
              name: "graduationYear",
              value: degree.graduationYear,
              onChange: (graduationYear) =>
                updateDegree(degId, "graduationYear", graduationYear),
            }}
          />
        </fieldset>
      ))}
    </div>
  );
};

export interface CertificationFieldsetsProps {
  className?: string;
}

export const CertificationFieldsets = ({
  className,
}: CertificationFieldsetsProps) => {
  const { certifications, updateCertification, removeCertification } =
    useResumeBuilderForm();
  return (
    <div className={className}>
      {Object.entries(certifications).map(
        ([certId, cert]: [string, Certification]) => (
          <fieldset key={certId} className={classes.forms.fieldsets.default}>
            <legend className={classes.forms.fieldsets.legend}>
              Certification Item
            </legend>

            <div className="inline-flex w-full justify-end">
              <IconButton
                title={`Delete ${cert.title} from resume`}
                iconName="trash"
                onClick={() => removeCertification(certId)}
                iconSize="sm"
              />
            </div>
            <InputGroup
              label={{
                icon: {
                  name: "title",
                  size: "sm",
                },
                text: "Title",
              }}
              input={{
                value: cert.title,
                onChange: (newTitle: string) =>
                  updateCertification(certId, "title", newTitle),
              }}
            />
            <InputGroup
              label={{
                icon: {
                  name: "company",
                  size: "sm",
                },
                text: "Issuer",
              }}
              input={{
                value: cert.issuer,
                onChange: (newIssuer) =>
                  updateCertification(certId, "issuer", newIssuer),
              }}
            />
            <div className="grid grid-cols-2 gap-x-4">
              <InputGroup
                label={{
                  icon: {
                    name: "calendar",
                    size: "sm",
                  },
                  text: "Date Issued",
                }}
                input={{
                  type: "date",
                  value: cert.dateIssued,
                  onChange: (dateIssue) =>
                    updateCertification(certId, "dateIssued", dateIssue),
                }}
              />
              <InputGroup
                label={{
                  icon: {
                    name: "calendar",
                    size: "sm",
                  },
                  text: "Date Expires",
                }}
                input={{
                  type: "date",
                  value: cert.dateExpires,
                  onChange: (expDate) =>
                    updateCertification(certId, "dateExpires", expDate),
                }}
              />
            </div>
          </fieldset>
        ),
      )}
    </div>
  );
};

const EducationList = () => {
  const { addDegree, addCertification } = useResumeBuilderForm();

  return (
    <>
      <div>
        <div className="inline-flex w-full space-x-1 items-center">
          <p>
            <strong>Degree(s)</strong>
          </p>
          <hr className="flex-1" aria-hidden="true" />
          <IconButton
            iconName="plus"
            title="Add degree item and edit"
            onClick={addDegree}
          />
        </div>
        <DegreeFieldsets className="my-4 space-y-2" />
      </div>
      <div>
        <div className="inline-flex w-full space-x-1 items-center">
          <p>
            <strong>Certification(s)</strong>
          </p>
          <hr className="flex-1" aria-hidden="true" />
          <IconButton
            iconName="plus"
            title="Add certification item and edit"
            onClick={addCertification}
          />
        </div>
        <CertificationFieldsets className="my-4 space-y-2" />
      </div>
    </>
  );
};

export default EducationList;
