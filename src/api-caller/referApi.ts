import { getInstanceLocal } from "@api/apiClient";
import { ICreateRefer } from "@constants";
import { formattedError } from "@utils";

export async function createReferral({
  me,
  hn_id,
}: ICreateRefer): Promise<any> {
  try {
    const { data } = await getInstanceLocal().post("/refer", {
      me,
      hn_id,
    });
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}
