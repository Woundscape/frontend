import { getInstanceLocal } from "@api/apiClient";
import { formattedError } from "@utils";

export async function getImageByCaseId(case_id: string): Promise<any> {
  try {
    const { data } = await getInstanceLocal().get(`/image/${case_id}`);
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}

export default async function uploadImage(formData: FormData): Promise<any> {
  try {
    const { data } = await getInstanceLocal().post("/image/", formData);
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}
