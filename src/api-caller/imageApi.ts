import { getInstanceLocal } from "@api/apiClient";
import { IImage } from "@constraint/constraint";
import { formattedError } from "@utils";

export async function getImageById(img_id: string): Promise<IImage> {
  try {
    const { data } = await getInstanceLocal().get(`/image/${img_id}`);
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}

export async function getAllImageByCaseId(case_id: string): Promise<IImage[]> {
  try {
    const { data } = await getInstanceLocal().get(
      `/image/getByCaseId/${case_id}`
    );
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}

export async function getAllImageById(img_id: string): Promise<IImage[]> {
  try {
    const { data } = await getInstanceLocal().get(`/image/getAllByImageId/${img_id}`);
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
