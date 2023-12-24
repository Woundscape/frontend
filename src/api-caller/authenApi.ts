import { formattedError } from "@utils";
import { getInstanceLocal } from "../api/apiClient";

export interface IFormInputsLogin {
  user_email: string;
  user_password: string;
}

export async function login(request: IFormInputsLogin): Promise<any> {
  try {
    const { data } = await getInstanceLocal().post("/user/login", request);
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}
