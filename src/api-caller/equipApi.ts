import { getInstanceLocal } from "@api/apiClient";
import {
  EquipmentQueryParams,
  ICreateEquip,
  IEquipType,
  IEquipment,
} from "@constants";
import { formattedError } from "@utils";

export async function getAllEquipment(): Promise<IEquipment[]> {
  try {
    const { data } = await getInstanceLocal().get("/equipment");
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}

export async function searchEquipQueryParams(
  params: EquipmentQueryParams
): Promise<IEquipment[]> {
  try {
    const { data } = await getInstanceLocal().get(`/equipment/search/query`, {
      params,
    });
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}

export async function getTypeEquipment(): Promise<IEquipType[]> {
  try {
    const { data } = await getInstanceLocal().get("/equipment/type");
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}

export async function addTypeEquipment(type_name: string): Promise<IEquipType> {
  try {
    const { data } = await getInstanceLocal().post("/equipment/type", {
      type_name,
    });
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

export async function updateEquipment(body: IEquipment): Promise<boolean> {
  try {
    const { data } = await getInstanceLocal().put("/equipment", body);
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}

export async function deleteEquipment(equip_id: string): Promise<boolean> {
  try {
    const { data } = await getInstanceLocal().delete(`/equipment/${equip_id}`);
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}
