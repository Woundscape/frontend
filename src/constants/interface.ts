import { UploadFile } from "antd";

export interface IFormattedErrorResponse {
  message?: string;
  infoMessage?: string;
  status?: number;
  statusText?: string;
}

export interface TissueType {
  title: string;
  value: number;
  color: string;
}

export interface ICase {
  case_id: string;
  hn_id: string;
  line_uid: string | null;
  doctor_assign: string[] | [];
  status: string | null;
  stage: string | null;
  created_at: Date;
  updated_at: Date;
  disease?: any | null;
}

export enum UserType {
  Patient = "Patient",
  Doctor = "Doctor",
  Admin = "Admin",
}

export enum DoctorType {
  General = "General",
  Doctor = "Doctor",
  Expert = "Expert",
  Admin = "Admin",
  Reject = "Reject",
}

export interface IUser {
  user_firstname: string;
  user_lastname: string;
  user_email: string;
  user_password: string;
  user_tel: string;
  user_type: UserType;
  line_uid?: string | null;
  ref_code?: string;
}

export interface IDoctor {
  user_id: string;
  doctor_id: string;
  doctor_firstname: string | null;
  doctor_lastname: string | null;
  doctor_type: string;
  doctor_verified: boolean;
  line_uid: string | null;
  created_at: Date;
  isRowEditable?: boolean;
  isDoctor?: boolean;
  isExpert?: boolean;
}

export interface IPatient {
  case_id: string;
  admit_no: any;
  hn_id: string;
  doctor_id: string;
  status: string;
  stage: string;
  disease: string[];
  created_at: Date;
  updated_at: Date;
  imagePreview?: any;
}

export interface IMe {
  user_id: string;
  firstname: string;
  lastname: string;
  email: string;
  line_uid: string;
  doctor_id: string;
  doctor_type: string;
  doctor_verified: string;
}

export interface IImage {
  img_id: string;
  img_tissue: ITissue;
  img_equip?: any;
  img_equipPath?: string | null;
  img_path: string;
  img_status: boolean;
  img_read: boolean;
  created_at: Date;
  updated_at: Date;
  case_id: string;
  compareCompare_id?: any;
  progressionProg_id?: any;
}

export interface ITissue {
  paths: any;
  result: TissueType[];
}

export interface IEquipment {
  equip_id: string;
  equip_name: string;
  equip_type: string;
  equip_subtype?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface IEquipType {
  type_id: string;
  type_name: string;
  created_at?: Date;
}

export interface INote {
  note_title: string;
  note_equip: string[];
  note_desc: string;
  note_img: UploadFile<any>[];
  img_id: string;
  created_at?: Date;
  author_id: string;
}

export interface ICompare {
  compare_id: string;
  compare_notes: any[];
  img_collect: IImage[];
  created_at: string;
  updated_at: string;
}

export interface IPreCompare {
  compare_info: TissueType[];
  case_id: string;
  img_collect: string[];
  compare_id?: string;
}

export interface ICreateCompare {
  note_title: string;
  note_desc: string;
  note_img: UploadFile<any>[];
  created_at?: Date;
  author_id: string;
  compare: IPreCompare;
}

export interface IAddCompareNote {
  note_title: string;
  note_desc: string;
  note_img: UploadFile<any>[];
  author_id: string;
  compare_id: string;
}

export interface IPreProgress {
  prog_info: any;
  case_id: string;
  img_collect: string[];
  prog_id?: string;
}

export interface ICreateProgress {
  note_title: string;
  note_desc: string;
  note_img: UploadFile<any>[];
  created_at?: Date;
  author_id: string;
  progress: IPreProgress;
}

export interface IRefer {
  ref_id: string;
  ref_code: string;
  ref_status: boolean;
  case_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface ICreateRefer {
  hn_id: string;
  me: IMe;
}

export interface ICreateEquip {
  equip_name: string;
  equip_type: string;
  equip_subtype: string;
}

export interface ICreateNotification {
  noti_type: string;
  noti_title: string;
  noti_desc: string;
  noti_img?: any;
  case_id?: string;
  approveStatus: boolean;
  sender_id: string | undefined;
  recipient_id: string;
}

export interface IFieldDoctorName {
  user_id: string;
  user_firstname: string | null;
  user_lastname: string | null;
  doctor_id: string;
}

export interface IChart {
  labels: string[];
  datasets: IDataSet[];
}
export interface IDataSet {
  label: string;
  data: any[];
  borderColor: string;
}
