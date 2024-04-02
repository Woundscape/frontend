import { AllocationQueryParams, CaseQueryParams, ICase } from "@constants";
import { formattedError } from "@utils";
import { getInstanceLocal } from "../api/apiClient";

export interface IUpdateCase {
  case_id: string;
  body: any;
}

export interface IAcceptConsult {
  noti_id: string;
  case_id: string;
  hn_id: string;
  doctor_id: string;
}

export const getAllCase = async (): Promise<ICase[]> => {
  try {
    const { data } = await getInstanceLocal().get("/case");
    return data;
  } catch (error) {
    throw formattedError(error);
  }
};

export const getCaseById = async (params: string): Promise<any> => {
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
  doctor_id,
}: {
  doctor_id: string;
}): Promise<any> => {
  try {
    const { data } = await getInstanceLocal().get(
      `/case/getByDoctorId/${doctor_id}`
    );
    return data;
  } catch (error) {
    throw formattedError(error);
  }
};

export async function getHistoryByCaseId(case_id: string): Promise<any> {
  try {
    const { data } = await getInstanceLocal().get(`/case/history`, {
      params: {
        case_id,
      },
    });
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}

export async function searchAllocationQueryParams(
  params: AllocationQueryParams
): Promise<ICase[]> {
  try {
    const { data } = await getInstanceLocal().get(`/case/user/search/query`, {
      params,
    });
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}

export async function searchCaseQueryParams(
  params: CaseQueryParams
): Promise<any[]> {
  try {
    const { data } = await getInstanceLocal().get(`/case/search/query`, {
      params,
    });
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}

export const updateCase = async ({
  case_id,
  body,
}: IUpdateCase): Promise<boolean> => {
  try {
    const { data } = await getInstanceLocal().put(`/case`, {
      case_id: case_id,
      ...body,
    });
    return data;
  } catch (error) {
    throw formattedError(error);
  }
};

export const updateDoctor = async ({
  case_id,
  body,
}: IUpdateCase): Promise<boolean> => {
  try {
    const { data } = await getInstanceLocal().put(`/case/doctor`, {
      case_id: case_id,
      ...body,
    });
    return data === "Successfully";
  } catch (error) {
    throw formattedError(error);
  }
};

export const acceptConsult = async ({
  noti_id,
  case_id,
  hn_id,
  doctor_id,
}: IAcceptConsult): Promise<any> => {
  try {
    const { data } = await getInstanceLocal().put(`/case/accept`, {
      noti_id,
      case_id,
      hn_id,
      doctor_id,
    });
    return data;
  } catch (error) {
    throw formattedError(error);
  }
};

export const declineConsult = async (noti_id: string): Promise<boolean> => {
  try {
    const { data } = await getInstanceLocal().put(`/case/decline`, {
      noti_id,
    });
    return data;
  } catch (error) {
    throw formattedError(error);
  }
};
