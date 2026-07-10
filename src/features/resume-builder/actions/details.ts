export type DetailsActionName =
  "about-changed" | "name-changed" | "email-changed" | "phone-changed";

export interface DetailsActionType {
  type: DetailsActionName;
}
export interface NameChangedAction extends DetailsActionType {
  type: "name-changed";
  payload: {
    newName: string;
  };
}
export interface EmailChangedAction extends DetailsActionType {
  type: "email-changed";
  payload: {
    newEmail: string;
  };
}
export interface PhoneChangedAction extends DetailsActionType {
  type: "phone-changed";
  payload: {
    newPhone: string;
  };
}
export interface AboutChangedAction extends DetailsActionType {
  type: "about-changed";
  payload: {
    newAbout: string;
  };
}
export type DispatchDetailsAction =
  | NameChangedAction
  | EmailChangedAction
  | PhoneChangedAction
  | AboutChangedAction;
