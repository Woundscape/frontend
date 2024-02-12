import { getInstanceLocal } from "@api/apiClient";
import { ICreateNotification, IMe } from "@constants";
import { formattedError } from "@utils";

export async function getNotification(me: IMe): Promise<any> {
  try {
    const { data } = await getInstanceLocal().post("/refer", {
      me,
    });
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}

export async function sendNotification(
  body: ICreateNotification
): Promise<any> {
  try {
    const form = new FormData();
    await Object.entries(body).forEach(([key, value]) => {
      if (value instanceof Object) {
        value = value.forEach((file: any, _: any) => {
          let fileBlob = file.originFileObj ?? new Blob();
          form.append(key, fileBlob);
        });
      } else {
        form.append(key, value);
      }
    });
    const { data } = await getInstanceLocal().post("/notification", form);
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}
