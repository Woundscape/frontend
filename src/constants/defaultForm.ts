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
import {
  AllocationQueryParams,
  CaseQueryParams,
  DoctorQueryParams,
  ImageQueryParams,
} from "./query";

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
      borderColor: "#AAF0C2",
    },
    {
      label: "epithelization",
      data: [],
      borderColor: "#CFFF9E",
    },
    {
      label: "callus",
      data: [],
      borderColor: "#FFFB9C",
    },
    {
      label: "periwound",
      data: [],
      borderColor: "#FFDFA2",
    },
    {
      label: "wound",
      data: [],
      borderColor: "#FFB8B8",
    },
    {
      label: "granulation",
      data: [],
      borderColor: "#ECB9FF",
    },
    {
      label: "deep structure",
      data: [],
      borderColor: "#A1B6FF",
    },
    {
      label: "marceration",
      data: [],
      borderColor: "#ABF4F4",
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
    color: "#AAF0C2",
  },
  {
    title: "epithelization",
    value: 0,
    color: "#CFFF9E",
  },
  {
    title: "callus",
    value: 0,
    color: "#FFFB9C",
  },
  {
    title: "periwound",
    value: 0,
    color: "#FFDFA2",
  },
  {
    title: "wound",
    value: 0,
    color: "#FFB8B8",
  },
  {
    title: "granulation",
    value: 0,
    color: "#ECB9FF",
  },
  {
    title: "deep structure",
    value: 0,
    color: "#A1B6FF",
  },
  {
    title: "marceration",
    value: 0,
    color: "#ABF4F4",
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

export const DefaultUserQueryParams: AllocationQueryParams = {
  offset: 0,
  limit: 20,
  hn_id: "",
  doctor_id: "",
  start_at: undefined,
  end_at: undefined,
  order_by: "asc",
};

export const DefaultCaseQueryParams: CaseQueryParams = {
  offset: 0,
  limit: 20,
  hn_id: "",
  doctor_id: "",
  start_at: undefined,
  end_at: undefined,
  order_by: "asc",
};

export const DefaultDoctorQueryParams: DoctorQueryParams = {
  offset: 0,
  limit: 20,
  doctor_name: "",
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
  case_id: "",
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
