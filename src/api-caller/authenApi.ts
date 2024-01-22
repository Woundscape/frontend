import { formattedError } from "@utils";
import { getInstanceLocal } from "../api/apiClient";
import { IMe } from "@constants/interface";

export interface IFormInputsLogin {
  user_email: string;
  user_password: string;
}

export interface Credentials {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  tokenType: string;
}

export async function login(request: IFormInputsLogin): Promise<Credentials> {
  try {
    const { data } = await getInstanceLocal().post("/user/login", request);
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}

export async function getMe(token: string): Promise<IMe> {
  try {
    const { data } = await getInstanceLocal().get('/user/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}
