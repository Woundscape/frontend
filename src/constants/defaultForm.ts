import {
  ICreateCompare,
  ICreateEquip,
  ICreateNotification,
  ICreateProgress,
  IEquipment,
  INote,
  UserType,
} from "./interface";
import { DashboardCard } from "@api-caller";
import { NotificationType } from "./notification";
import { ImageQueryParams } from "./query";

export const DefaultTotalDashboard: DashboardCard[] = [
  {
    title: "Total",
    value: "0",
  },
  {
    title: "Special Cases",
    value: "0",
  },
  {
    title: "Unread",
    value: "0",
  },
];

export const DefaultDataSet = {
  labels: [],
  datasets: [
    {
      label: "eschar",
      data: [],
      borderColor: "#EEEEEE",
    },
    {
      label: "slough",
      data: [],
      borderColor: "#CFEDD9",
    },
    {
      label: "epithelization",
      data: [],
      borderColor: "#E0FCC5",
    },
    {
      label: "callus",
      data: [],
      borderColor: "#FFFDC5",
    },
    {
      label: "periwound",
      data: [],
      borderColor: "#FFE8BF",
    },
    {
      label: "wound",
      data: [],
      borderColor: "#FFE1E1",
    },
    {
      label: "granulation",
      data: [],
      borderColor: "#E6D1ED",
    },
    {
      label: "deep structure",
      data: [],
      borderColor: "#D3DDFF",
    },
    {
      label: "marceration",
      data: [],
      borderColor: "#D4F3F3",
    },
  ],
};

export const DefaultTissue = [
  {
    title: "eschar",
    value: 0,
    color: "#EEEEEE",
  },
  {
    title: "slough",
    value: 0,
    color: "#CFEDD9",
  },
  {
    title: "epithelization",
    value: 0,
    color: "#E0FCC5",
  },
  {
    title: "callus",
    value: 0,
    color: "#FFFDC5",
  },
  {
    title: "periwound",
    value: 0,
    color: "#FFE8BF",
  },
  {
    title: "wound",
    value: 0,
    color: "#FFE1E1",
  },
  {
    title: "granulation",
    value: 0,
    color: "#E6D1ED",
  },
  {
    title: "deep structure",
    value: 0,
    color: "#D3DDFF",
  },
  {
    title: "marceration",
    value: 0,
    color: "#D4F3F3",
  },
];

export const DefaultImageQueryParams: ImageQueryParams = {
  offset: 0,
  limit: 20,
  case_id: "",
  image_id: "",
  start_at: undefined,
  end_at: undefined,
  order_by: "asc",
};

export const DefaultNoteForm: INote = {
  note_title: "",
  note_equip: [],
  note_desc: "",
  note_img: [],
  img_id: "",
  author_id: "",
};

export const DefaultCompareForm: ICreateCompare = {
  note_title: "",
  note_desc: "",
  note_img: [],
  compare: {
    case_id: "",
    compare_info: DefaultTissue,
    img_collect: [],
  },
  author_id: "",
};

export const DefaultProgressForm: ICreateProgress = {
  note_title: "",
  note_desc: "",
  note_img: [],
  progress: {
    case_id: "",
    prog_info: DefaultTissue,
    img_collect: [],
  },
  author_id: "",
};

export const DefaultEquipForm: ICreateEquip = {
  equip_name: "",
  equip_type: "",
  equip_subtype: "",
};

export const DefaultEquipment: IEquipment = {
  equip_id: "",
  equip_name: "",
  equip_type: "",
  equip_subtype: "",
};

export const DefaultPatientForm = {
  user_firstname: "",
  user_lastname: "",
  user_email: "",
  user_password: "",
  user_tel: "",
  line_uid: "",
  user_type: UserType.Patient,
  ref_code: "",
};

export const DefaultConsultForm: ICreateNotification = {
  noti_type: NotificationType.CONSULT,
  noti_title: "",
  noti_desc: "",
  noti_img: [],
  approveStatus: false,
  sender_id: "",
  recipient_id: "",
};

export const DefaultDoctorForm = {
  user_firstname: "",
  user_lastname: "",
  user_email: "",
  user_password: "",
  user_tel: "",
  user_type: UserType.Doctor,
  ref_code: "",
};

export const DefaultChart = {
  labels: [],
  datasets: [],
};

export const DefaultCreateCompare = {
  compare_info: DefaultTissue,
  img_collect: [],
  case_id: "",
};

export const DefaultCreateProgress = {
  prog_info: DefaultDataSet,
  img_collect: [],
  case_id: "",
};
