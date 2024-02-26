import { IPatient } from "@constants";
import { httpAPI } from "@config";
import { useNavigate } from "react-router-dom";
import { ClockCircleOutlined } from "@ant-design/icons";

interface CardPatientProps {
  patient: IPatient;
}
export default function CardPatient({ patient }: CardPatientProps) {
  const router = useNavigate();
  let image = patient.imagePreview[0]?.img_path
    ? patient.imagePreview[0].img_path
    : null;
  return (
    <div
      onClick={() => router(`/patient/${patient.case_id}`)}
      className="p-1.5 w-64 border-2 rounded-2xl space-y-1.5 cursor-pointer"
    >
      <div
        className="patient_img w-[15rem] h-40 flex items-end py-1 justify-center"
        style={{
          backgroundImage: `url("${httpAPI}/${image}")`,
        }}
      ></div>
      <div className="flex justify-between w-full p-2 bg-[#F2F2F2] rounded-xl">
        <p id="text__primary">HN.{patient.hn_id}</p>

        <p className="jura text-[#626060]">
          <ClockCircleOutlined style={{ color: "#626060", paddingRight: 2 }} />
          {new Date(patient.updated_at).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}
