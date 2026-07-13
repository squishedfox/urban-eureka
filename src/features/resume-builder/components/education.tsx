import {
  BuildingIcon,
  CalendarIcon,
  IconButton,
  PersonCircleExclamationIcon,
  PlusIcon,
  TrashIcon,
} from "@app/components";
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
              icon: <PersonCircleExclamationIcon size="sm" />,
              text: "Title",
            }}
            input={{
              name: "title",
              value: degree.title,
              onChange: (event) =>
                updateDegree(degId, "title", event.currentTarget.value),
            }}
          />
          <InputGroup
            label={{
              icon: <BuildingIcon size="sm" />,
              text: "Institution",
            }}
            input={{
              name: "institution",
              value: degree.institution,
              onChange: (event) =>
                updateDegree(degId, "institution", event.currentTarget.value),
            }}
          />
          <InputGroup
            label={{
              icon: <CalendarIcon size="sm" />,
              text: "Graduation Year",
            }}
            input={{
              type: "date",
              name: "graduationYear",
              value: degree.graduationYear,
              onChange: (event) =>
                updateDegree(
                  degId,
                  "graduationYear",
                  event.currentTarget.value,
                ),
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
                icon: <PersonCircleExclamationIcon size="sm" />,
                text: "Title",
              }}
              input={{
                value: cert.title,
                onChange: (event) =>
                  updateCertification(
                    certId,
                    "title",
                    event.currentTarget.value,
                  ),
              }}
            />
            <InputGroup
              label={{
                icon: <BuildingIcon size="sm" />,
                text: "Issuer",
              }}
              input={{
                value: cert.issuer,
                onChange: (event) =>
                  updateCertification(
                    certId,
                    "issuer",
                    event.currentTarget.value,
                  ),
              }}
            />
            <div className="grid grid-cols-2 gap-x-4">
              <InputGroup
                label={{
                  icon: <CalendarIcon size="sm" />,
                  text: "Date Issued",
                }}
                input={{
                  type: "date",
                  value: cert.dateIssued,
                  onChange: (event) =>
                    updateCertification(
                      certId,
                      "dateIssued",
                      event.currentTarget.value,
                    ),
                }}
              />
              <InputGroup
                label={{
                  icon: <CalendarIcon size="sm" />,
                  text: "Date Expires",
                }}
                input={{
                  type: "date",
                  value: cert.dateExpires,
                  onChange: (event) =>
                    updateCertification(
                      certId,
                      "dateExpires",
                      event.currentTarget.value,
                    ),
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
            onClick={() => addDegree()}
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
            onClick={() => addCertification()}
          />
        </div>
        <CertificationFieldsets className="my-4 space-y-2" />
      </div>
    </>
  );
};

export default EducationList;
