export enum NotifyType {
  UPLOAD = "upload",
  ADD_EQUIP = "add_equipment",
  APPROVE = "approve_user",
  UPDATE_TYPE = "updateType",
  DEL_USER = "deleteuser",
  EDIT_EQUIP = "edit_equipment",
  DEL_EQUIP = "del_equipment",
  EDIT_IMAGE = "edit_image",
  CHANGE_DOCTOR = "change_doctor",
  CONSULT = "consult",
  INFO = "info",
  WARNING = "warning",
  NOTFOUND = "notfound",
  USED_EMAIL = "emailortel",
  SIGNUP = "signup",
  ERROR = "error",
  RESET = "reset",
}

export enum ENUM_TYPE {
  SUCCESS = "success",
  INFO = "info",
  WARNING = "warning",
  ERROR = "error",
}

export interface NotifyContent {
  TYPE: ENUM_TYPE;
  TITLE: string;
  CONTENT: string;
}

export const NotificationMessage: Record<NotifyType, NotifyContent> = {
  [NotifyType.UPLOAD]: {
    TYPE: ENUM_TYPE.SUCCESS,
    TITLE: "Add Image",
    CONTENT: "Image has been successfully uploaded",
  },
  [NotifyType.SIGNUP]: {
    TYPE: ENUM_TYPE.SUCCESS,
    TITLE: "Signup",
    CONTENT: "Your account has been successfully created.",
  },
  [NotifyType.APPROVE]: {
    TYPE: ENUM_TYPE.SUCCESS,
    TITLE: "Approve User",
    CONTENT: "User have been succesfully approved.",
  },
  [NotifyType.UPDATE_TYPE]: {
    TYPE: ENUM_TYPE.SUCCESS,
    TITLE: "Update Role",
    CONTENT: "User have been succesfully updated role.",
  },
  [NotifyType.DEL_USER]: {
    TYPE: ENUM_TYPE.SUCCESS,
    TITLE: "Delete User",
    CONTENT: "You have been deleted this account",
  },
  [NotifyType.ADD_EQUIP]: {
    TYPE: ENUM_TYPE.SUCCESS,
    TITLE: "Add Equipment",
    CONTENT: "Equipment has been successfully added.",
  },
  [NotifyType.EDIT_EQUIP]: {
    TYPE: ENUM_TYPE.SUCCESS,
    TITLE: "Edit Equipment",
    CONTENT: "Equipment has been successfully edited.",
  },
  [NotifyType.DEL_EQUIP]: {
    TYPE: ENUM_TYPE.SUCCESS,
    TITLE: "Delete Equipment",
    CONTENT: "Equipment has been successfully deleted.",
  },
  [NotifyType.EDIT_IMAGE]: {
    TYPE: ENUM_TYPE.SUCCESS,
    TITLE: "Edit Image",
    CONTENT: "Image has been successfully edited.",
  },
  [NotifyType.CONSULT]: {
    TYPE: ENUM_TYPE.SUCCESS,
    TITLE: "Consult",
    CONTENT: "Message has been sent to doctor successfully.",
  },
  [NotifyType.CHANGE_DOCTOR]: {
    TYPE: ENUM_TYPE.SUCCESS,
    TITLE: "Change Doctor",
    CONTENT: "Patient has been successfully updated",
  },
  [NotifyType.INFO]: {
    TYPE: ENUM_TYPE.INFO,
    TITLE: "Info Header",
    CONTENT: "info content",
  },
  [NotifyType.WARNING]: {
    TYPE: ENUM_TYPE.WARNING,
    TITLE: "Warning",
    CONTENT: "warning content",
  },
  [NotifyType.NOTFOUND]: {
    TYPE: ENUM_TYPE.ERROR,
    TITLE: "User Not Found",
    CONTENT: "Email doesn't existing",
  },
  [NotifyType.USED_EMAIL]: {
    TYPE: ENUM_TYPE.ERROR,
    TITLE: "Error",
    CONTENT: "Email or Tel already used",
  },
  [NotifyType.ERROR]: {
    TYPE: ENUM_TYPE.ERROR,
    TITLE: "Error",
    CONTENT: "Something went wrong",
  },
  [NotifyType.RESET]: {
    TYPE: ENUM_TYPE.SUCCESS,
    TITLE: "ResetPassword",
    CONTENT: "ResetPassword Successfully",
  },
};
