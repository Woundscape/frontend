import { getInstanceLocal } from "@api/apiClient";
import { formattedError } from "@utils";

export async function getProgressById(prog_id: string) {
  try {
    const { data } = await getInstanceLocal().get(`/progress/${prog_id}`);
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}
