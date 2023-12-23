import { getInstanceLocal } from "@api/apiClient";
import { formattedError } from "@utils";

export default async function getAllEquipment(): Promise<any> {
  try {
    const { data } = await getInstanceLocal().get("/equipment");
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}
