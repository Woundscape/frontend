import { getInstanceLocal } from "@api/apiClient";
import { IMe } from "@constants";
import { formattedError } from "@utils";

export async function createReferral(me: IMe): Promise<any> {
  try {
    const { data } = await getInstanceLocal().post("/refer", {
      me,
    });
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}
