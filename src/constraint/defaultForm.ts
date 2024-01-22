import { UserType } from "./constraint";

export const DefaultNoteForm = {
  note_title: "",
  note_equip: [],
  note_desc: "",
  note_img: [],
  img_id: "",
};
export const DefaultUserForm = {
  user_firstname: "",
  user_lastname: "",
  user_email: "",
  user_password: "",
  user_tel: "",
  user_type: UserType.Doctor,
};
