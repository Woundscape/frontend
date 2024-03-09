import { getInstanceLocal } from "@api/apiClient";
import { formattedError } from "@utils";

export async function getCompareById(compare_id: string): Promise<any> {
  try {
    const { data } = await getInstanceLocal().get(`/compare/${compare_id}`);
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}

