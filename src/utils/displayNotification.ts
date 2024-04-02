import { ENUM_TYPE, NotificationMessage, NotifyType } from "@constants";
import { notification } from "antd";

export function displayNotification(type: NotifyType) {
  const notificationDetails = NotificationMessage[type];

  const { TYPE, TITLE, CONTENT } = notificationDetails as {
    TYPE: ENUM_TYPE;
    TITLE: string;
    CONTENT: string;
  };
  notification[TYPE]({
    message: TITLE,
    description: CONTENT,
  });
}

export function capitalizeFirstLetter(value: string) {
  try {
    return value.charAt(0).toUpperCase() + value.slice(1);
  } catch (error) {
    return value;
  }
}
