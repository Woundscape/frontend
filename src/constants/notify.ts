export enum NotifyType {
  SUCCESS = "success",
  SUCCESS_UPLOAD = "upload",
  INFO = "info",
  WARNING = "warning",
  ERROR = "error",
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
  [NotifyType.SUCCESS]: {
    TYPE: ENUM_TYPE.SUCCESS,
    TITLE: "Header",
    CONTENT: "test",
  },
  [NotifyType.SUCCESS_UPLOAD]: {
    TYPE: ENUM_TYPE.SUCCESS,
    TITLE: "sds",
    CONTENT: "testdsadaskd;asjdas",
  },
  [NotifyType.INFO]: {
    TYPE: ENUM_TYPE.INFO,
    TITLE: "Info Header",
    CONTENT: "info content",
  },
  [NotifyType.WARNING]: {
    TYPE: ENUM_TYPE.WARNING,
    TITLE: "Warning Header",
    CONTENT: "warning content",
  },
  [NotifyType.ERROR]: {
    TYPE: ENUM_TYPE.ERROR,
    TITLE: "Error Header",
    CONTENT: "Something went wrong",
  },
};
