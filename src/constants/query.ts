export interface ImageQueryParams {
  offset: number;
  limit: number;
  case_id: string;
  image_id: string | undefined;
  start_at: string | undefined;
  end_at: string | undefined;
  order_by: string | undefined;
  isRead?: boolean;
}

export interface AllocationQueryParams {
  offset: number;
  limit: number;
  doctor_id: string;
  hn_id: string;
  start_at: string | undefined;
  end_at: string | undefined;
  order_by: string;
}

export interface CaseQueryParams {
  offset: number;
  limit: number;
  doctor_id: string;
  hn_id: string | undefined;
  start_at: string | undefined;
  end_at: string | undefined;
  order_by: string | undefined;
}

export interface DoctorQueryParams {
  offset: number;
  limit: number;
  doctor_name: string;
  start_at: string | undefined;
  end_at: string | undefined;
  order_by: string | undefined;
}

export interface EquipmentQueryParams {
  offset: number;
  limit: number;
  equio_id: string;
  type_id: string;
  order_by: string | undefined;
}
