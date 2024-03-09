export interface ImageQueryParams {
  offset: number;
  limit: number;
  case_id: string;
  image_id: string | undefined;
  start_at: string | undefined;
  end_at: string | undefined;
  order_by: string | undefined;
}
