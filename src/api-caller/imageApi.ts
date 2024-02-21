import { IImage } from "@constants";
import { formattedError } from "@utils";
import { getInstanceLocal } from "@api/apiClient";

export interface IUpdateImage {
  img_id: string;
  body: any;
}

export interface IUpdateEquipment {
  img_id: string;
  equip_id: string[];
}

export async function getImageById(img_id: string): Promise<IImage> {
  try {
    const { data } = await getInstanceLocal().get(`/image/${img_id}`);
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}

export async function getCoupleImage(imageList: string[]): Promise<IImage[]> {
  try {
    const { data } = await getInstanceLocal().get(
      `/image/couple/${imageList[0]}/${imageList[1]}`
    );
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
    const { data } = await getInstanceLocal().get(
      `/image/getAllByImageId/${img_id}`
    );
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}

export async function getProgressImage(imgList: string[]): Promise<IImage[]> {
  try {
    const { data } = await getInstanceLocal().get(`/image/progress`, {
      data: {
        imgList,
      },
    });
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}

export async function updateImage({
  img_id,
  body,
}: IUpdateImage): Promise<boolean> {
  try {
    const { data } = await getInstanceLocal().put(`/image/${img_id}`, body);
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}

export async function uploadImage(form: FormData): Promise<any> {
  try {
    const { data } = await getInstanceLocal().post("/image/", form);
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}

export async function updateImageEquipment({
  img_id,
  equip_id,
}: IUpdateEquipment): Promise<any> {
  try {
    const { data } = await getInstanceLocal().put("/image/equipment", {
      img_id: img_id,
      equip_id: equip_id,
    });
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}

export async function deleteImage(img_id: any): Promise<boolean> {
  try {
    const { data } = await getInstanceLocal().delete(`/image`, {
      data: {
        img_id: img_id,
      },
    });
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}
