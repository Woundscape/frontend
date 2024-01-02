import { getInstanceLocal } from "@api/apiClient";
import { formattedError } from "@utils";

export async function getImageByCaseId(case_id: string): Promise<any> {
  try {
    const { data } = await getInstanceLocal().get(
      `/image/getByCaseId/${case_id}`
    );
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

export async function deleteImage(img_id: any): Promise<string> {
  try {
    const { data } = await getInstanceLocal().delete(`/image/`, {
      data: {
        img_id: img_id,
      },
    });
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}
