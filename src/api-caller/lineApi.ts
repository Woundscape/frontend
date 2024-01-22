import { getInstanceLocal } from "@api/apiClient";
import { UserType } from "@constants/interface";
import { formattedError } from "@utils";

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
    const { data } = await getInstanceLocal().post(`/line/me`, {
      userId: credentials.userId,
    });
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}

export async function lineLogin(credentials: LineCredential): Promise<any> {
  try {
    const { data } = await getInstanceLocal().post(`/line/signin`, {
      userId: credentials.userId,
      displayName: credentials.displayName,
      type: credentials.type,
    });
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
