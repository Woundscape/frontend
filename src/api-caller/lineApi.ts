import { UserType } from "@constants";
import { formattedError } from "@utils";
import { getInstanceLocal } from "@api/apiClient";

export interface LineCredential {
  userId: string;
  displayName: string;
  type?: UserType;
  hn_id?: string;
}

export async function getLineMe(
  credentials: LineCredential
): Promise<LineCredential> {
  try {
    const { data } = await getInstanceLocal().get(`/line/me`, {
      params: {
        line_uid: credentials.userId,
      },
    });
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}

export async function getImageByUID(line_uid: string) {
  try {
    const { data } = await getInstanceLocal().get(`/line/history`, {
      params: {
        line_uid,
      },
    });
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}

export async function lineLogin(credentials: LineCredential): Promise<any> {
  try {
    const { data } = await getInstanceLocal().post(`/line/login`, credentials);
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}

export async function lineUpload(formImage: FormData): Promise<any> {
  try {
    const { data } = await getInstanceLocal().post("/line/upload", formImage);
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}
