import { UserType } from "./interface";

export const DefaultNoteForm = {
  note_title: "",
  note_equip: [],
  note_desc: "",
  note_img: [],
  img_id: "",
};

export const DefaultEquipForm = {
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
