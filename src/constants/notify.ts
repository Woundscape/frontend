export enum NotifyType {
  SUCCESS, SUCCESS_UPLOAD = "success",
  INFO = "info",
  WARNING = "warning",
  ERROR = "error",
}

export interface NotifyContent {
  TITLE: string;
  CONTENT: string;
}

export const NotificationMessage: Record<NotifyType, NotifyContent> = {
  [NotifyType.SUCCESS]: {
    TITLE: "Header",
    CONTENT: "test",
  },
  [NotifyType.SUCCESS_UPLOAD]: {
    TITLE: "Success",
    CONTENT: "uploaded successfully",
  },
  [NotifyType.INFO]: {
    TITLE: "Info Header",
    CONTENT: "info content",
  },
  [NotifyType.WARNING]: {
    TITLE: "Warning Header",
    CONTENT: "warning content",
  },
  [NotifyType.ERROR]: {
    TITLE: "Error Header",
    CONTENT: "error content",
  },
};
