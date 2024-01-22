import { ICase } from "@constants/interface";
import { getInstanceLocal } from "../api/apiClient";
import { formattedError } from "@utils";

export const getAllCase = async (): Promise<ICase[]> => {
  try {
    const { data } = await getInstanceLocal().get("/case");
    return data;
  } catch (error) {
    throw formattedError(error);
  }
};

export const getCaseByCaseId = async (params: string): Promise<any> => {
  try {
    const { data } = await getInstanceLocal().get(
      `/case/getByCaseId/${params}`
    );
    return data;
  } catch (error) {
    throw formattedError(error);
  }
};

export const getCaseByDoctorId = async ({
  params,
}: {
  params: string;
}): Promise<any> => {
  try {
    const { data } = await getInstanceLocal().get(
      `/case/getByDoctorId/${params}`
    );
    return data;
  } catch (error) {
    throw formattedError(error);
  }
};

export interface IUpdateCase {
  case_id: string;
  body: any;
}

export const updateCase = async ({
  case_id,
  body,
}: IUpdateCase): Promise<boolean> => {
  try {
    const { data } = await getInstanceLocal().put(`/case/`, {
      case_id: case_id,
      ...body,
    });
    return data === "Successfully";
  } catch (error) {
    throw formattedError(error);
  }
};
