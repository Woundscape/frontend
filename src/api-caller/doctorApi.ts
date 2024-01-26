import { formattedError } from "@utils";
import { getInstanceLocal } from "../api/apiClient";
import { DoctorType, IDoctor } from "@constants/interface";

export interface IUpdateDoctorType {
  type: DoctorType;
  doctor_id: string;
}

export interface CardPatient {
  title: string;
  value: string;
}

export default async function getAllDoctor(
  verified: boolean
): Promise<IDoctor[]> {
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
  type,
  doctor_id,
}: IUpdateDoctorType): Promise<boolean> {
  try {
    const { data } = await getInstanceLocal().put(
      `/doctor/type/${type}/${doctor_id}`,
      {}
    );
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
