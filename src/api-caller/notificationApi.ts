import { getInstanceLocal } from "@api/apiClient";
import { IMe, ICreateNotification, INotification } from "@constants";
import { formattedError } from "@utils";

export async function getNotification(me: IMe): Promise<INotification[]> {
  try {
    const { data } = await getInstanceLocal().get(
      `/notification/${me.user_id}`
    );
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
