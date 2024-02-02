export enum NotificationType {
  SUCCESS = "success",
  INFO = "info",
  WARNING = "warning",
  ERROR = "error",
}

export const NotificationMessage: Record<NotificationType, { TITLE: string; CONTENT: string }> = {
  [NotificationType.SUCCESS]: {
    TITLE: "Header",
    CONTENT: "test",
  },
  [NotificationType.INFO]: {
    TITLE: "Info Header",
    CONTENT: "info content",
  },
  [NotificationType.WARNING]: {
    TITLE: "Warning Header",
    CONTENT: "warning content",
  },
  [NotificationType.ERROR]: {
    TITLE: "Error Header",
    CONTENT: "error content",
  },
};
