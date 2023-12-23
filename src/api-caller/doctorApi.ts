import { formattedError } from "@utils";
import { getInstanceLocal } from "../api/apiClient";
import { IDoctor } from "@constraint/constraint";

export default async function getAllDoctor(): Promise<IDoctor[]> {
  try {
    const { data } = await getInstanceLocal().get("/doctor");
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}
