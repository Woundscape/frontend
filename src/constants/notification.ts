export interface INotification {
  noti_id: string;
  noti_type: string;
  noti_title: string;
  noti_desc: string;
  noti_img?: any;
  approveStatus: boolean;
  hn_id?: string;
  case_id?: string;
  sender: any;
  recipient: any;
  created_at: any;
}

export enum NotificationType {
  CONSULT = "consult",
  UPLOAD = "upload",
  NOTE = "note",
  ACCEPT = "accept",
  CANCEL = "cancel",
}
