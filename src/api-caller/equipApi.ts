import { getInstanceLocal } from "@api/apiClient";
import { IEquipment } from "@constants/interface";
import { formattedError } from "@utils";

export interface ICreateEquip {
  equip_name: string;
  equip_type: string;
  equip_subtype: string;
}

export default async function getAllEquipment(): Promise<any> {
  try {
    const { data } = await getInstanceLocal().get("/equipment");
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}

export async function addEquipment(body: ICreateEquip): Promise<boolean> {
  try {
    const { data } = await getInstanceLocal().post("/equipment", body);
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}
