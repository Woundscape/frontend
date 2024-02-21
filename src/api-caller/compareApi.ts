import { getInstanceLocal } from "@api/apiClient";
import { formattedError } from "@utils";

export async function getCompareHistory(case_id: string): Promise<any> {
  try {
    const { data } = await getInstanceLocal().get(
      `/compare/history/${case_id}`
    );
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}
