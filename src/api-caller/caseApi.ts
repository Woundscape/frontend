import { ICase } from "@constraint/constraint";
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

export const getCaseByCaseId = async (params:string): Promise<any> => {
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

export const updateCase = async ({
  params,
  body,
}: {
  params: string;
  body: any;
}): Promise<boolean> => {
  try {
    const { data } = await getInstanceLocal().put(`/case/assignee/${params}`, {
      doctor_id: body.doctor_id,
    });
    return data === "Successfully";
  } catch (error) {
    throw formattedError(error);
  }
};
