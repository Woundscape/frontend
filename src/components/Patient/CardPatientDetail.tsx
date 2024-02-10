import { IImage } from "@constants";
import { formatImage } from "@utils";
import { Checkbox } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";

interface CardPatientDetailProps {
  image: IImage;
  checkedList: string[];
  stageSegmented: any;
  onImage: (image_id: string) => void;
}
export default function CardPatientDetail({
  image,
  checkedList,
  stageSegmented,
  onImage,
}: CardPatientDetailProps) {
  if (!image.img_status) return null;
  return (
    <div
      onClick={() => onImage(image.img_id)}
      className="mt-4 p-1.5 w-64 border-2 rounded-2xl space-y-1.5 cursor-pointer relative"
    >
      <div
        className="patient_img w-[15rem] h-40 flex items-end py-1 justify-center relative"
        style={{
          backgroundImage: `url("${formatImage(image.img_path)}")`,
        }}
      ></div>
      {stageSegmented.stage != "Overview" && (
        <Checkbox
          className="top-3 right-5 absolute"
          key={`checkbox__image__${1}`}
          value={image.img_id}
          checked={checkedList.includes(image.img_id)}
        />
      )}
      <div className="flex justify-between w-full p-2 bg-[#F2F2F2] rounded-xl">
        <p id="text__primary">{`No. 0000001`}</p>
        <p className="jura text-[#626060]">
          <ClockCircleOutlined style={{ color: "#626060", paddingRight: 2 }} />
          {new Date(image.created_at).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}
