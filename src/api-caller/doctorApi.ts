import { formattedError } from "@utils";
import { getInstanceLocal } from "../api/apiClient";
import { IDoctor } from "@constants/interface";

export default async function getAllDoctor(
  verified: boolean
): Promise<IDoctor[]> {
  try {
    const { data } = await getInstanceLocal().get("/doctor/getAllDoctor", {
      params: {
        verified: verified,
      },
    });
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}
