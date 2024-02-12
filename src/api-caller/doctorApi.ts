import { IDoctor } from "@constants";
import { formattedError } from "@utils";
import { getInstanceLocal } from "../api/apiClient";

export interface IUpdateDoctorType {
  isDoctor: boolean;
  isExpert: boolean;
  doctor_id: string;
}

export interface CardPatient {
  title: string;
  value: string;
}

export async function getAllDoctor(verified: boolean): Promise<IDoctor[]> {
  try {
    const { data } = await getInstanceLocal().get("/doctor/getAllDoctor", {
      params: {
        verified: verified,
      },
    });
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}

export async function updateDoctorType({
  isDoctor,
  isExpert,
  doctor_id,
}: IUpdateDoctorType): Promise<boolean> {
  try {
    const { data } = await getInstanceLocal().put(`/doctor/type/${doctor_id}`, {
      isDoctor,
      isExpert,
    });
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}

export async function verifiedDoctor(doctor_id: string): Promise<boolean> {
  try {
    const { data } = await getInstanceLocal().put(
      `/doctor/verified/${doctor_id}`
    );
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}

export async function getDashboard(doctor_id: string): Promise<CardPatient[]> {
  try {
    const { data } = await getInstanceLocal().get(
      `/doctor/dashboard/${doctor_id}`
    );
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}
