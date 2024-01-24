import { UploadFile } from "antd";
import { DefaultOptionType } from "antd/es/select";

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
  doctor_assign: string | null;
  status: string | null;
  stage: string | null;
  created_at: Date;
  updated_at: Date;
  disease?: any | null;
}

export enum UserType {
  Patient = "Patient",
  Doctor = "Doctor",
}

export interface IUser {
  user_firstname: string;
  user_lastname: string;
  user_email: string;
  user_password: string;
  user_tel: string;
  user_type: UserType;
  line_uid?: string | null;
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
}

export interface IImage {
  img_id: string;
  img_tissue?: any | [];
  img_equip?: any;
  img_path: string;
  img_status: boolean;
  created_at: Date;
  updated_at: Date;
  case_id: string;
  compareCompare_id?: any;
  progressionProg_id?: any;
}

export interface IEquipment {
  equip_id: string;
  equip_name: string;
  equip_type: string;
  equip_subtype?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface INote {
  note_title: string;
  note_equip: string[];
  note_desc: string;
  note_img: UploadFile<any>[];
  img_id: string;
  created_at?: Date;
}

export enum IStage {
  SPECIAL = "Special",
  UNSTABLE = "Unstable",
  STABLE = "Stable",
  IMPROVE = "Improved",
}

export const selectStage: DefaultOptionType[] = [
  {
    value: IStage.SPECIAL,
    label: IStage.SPECIAL,
  },
  {
    value: IStage.UNSTABLE,
    label: IStage.UNSTABLE,
  },
  {
    value: IStage.STABLE,
    label: IStage.STABLE,
  },
  {
    value: IStage.IMPROVE,
    label: IStage.IMPROVE,
  },
];

export const selectStatus: DefaultOptionType[] = [
  {
    value: "In Progress",
    label: "In Progress",
  },
  {
    value: "Done",
    label: "Done",
  },
];
