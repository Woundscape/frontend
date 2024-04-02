import { IMe, IUser, PLATFORM } from "@constants";
import { formattedError } from "@utils";
import { getInstanceLocal } from "../api/apiClient";

export interface IFormInputsLogin {
  user_email: string;
  user_password: string;
  uid: string;
  platform: PLATFORM;
}

export interface Credentials {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  tokenType: string;
}

export interface IMessage {
  hn_id: string;
  message: string;
}

export interface IResetPassword {
  user_id: string;
  password: string;
}

export async function login(request: IFormInputsLogin): Promise<Credentials> {
  try {
    const { data } = await getInstanceLocal().post("/user/login", request);
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}

export async function webRegister(request: IUser): Promise<boolean> {
  try {
    const { data } = await getInstanceLocal().post("/user/register", request);
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}

export async function lineRegister(request: IUser): Promise<any> {
  try {
    const { data } = await getInstanceLocal().post("/line/register", request);
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}

export async function getMe(token: string): Promise<IMe> {
  try {
    const { data } = await getInstanceLocal().get("/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}

export async function sendMessage({ hn_id, message }: IMessage): Promise<any> {
  try {
    const { data } = await getInstanceLocal().post("/user/sendMessage", {
      hn_id,
      message,
    });
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}

export async function sendEmail(email: string) {
  try {
    const { data } = await getInstanceLocal().post("/user/sendResetPassword", {
      email,
    });
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}

export async function resetPassword({ user_id, password }: IResetPassword) {
  try {
    const { data } = await getInstanceLocal().put("/user/resetPassword", {
      user_id,
      password,
    });
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}
