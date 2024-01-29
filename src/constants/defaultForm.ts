import { ICreateEquip } from "@api-caller/equipApi";
import { IEquipment, UserType } from "./interface";

export const DefaultNoteForm = {
  note_title: "",
  note_equip: [],
  note_desc: "",
  note_img: [],
  img_id: "",
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

export const DefaultUserForm = {
  user_firstname: "",
  user_lastname: "",
  user_email: "",
  user_password: "",
  user_tel: "",
  user_type: UserType.Doctor,
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

export const DefaultChart = {
  labels: [],
  datasets: [],
};
