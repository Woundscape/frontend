import { DefaultOptionType } from "antd/es/select";


export interface IFormattedErrorResponse {
  message?: string;
  infoMessage?: string;
  status?: number;
  statusText?: string;
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
  disease?: string | null;
}

export interface IDoctor {
  user_id: string;
  doctor_id: string;
  doctor_firstname: string | null;
  doctor_lastname: string | null;
  doctor_type: string;
  line_uid: string | null;
}

export interface IPatient {
  case_id: string;
  hn_id: string;
  status: string;
  stage: string;
  disease: any;
  created_at: Date;
  updated_at: Date;
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
