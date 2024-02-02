import { NotificationMessage, NotificationType } from "@constants";
import { notification } from "antd";

export function displayNotification(type: NotificationType) {
  const notificationDetails = NotificationMessage[type];

  const { TITLE, CONTENT } = notificationDetails as {
    TITLE: string;
    CONTENT: string;
  };
  notification[type]({
    message: TITLE,
    description: CONTENT,
  });
}
