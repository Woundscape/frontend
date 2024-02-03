import { Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import NotiAll from "@assets/icons/all_noti.svg"
import PatientNote from "@assets/icons/patient_note_noti.svg"
import Suggest from "@assets/icons/sugggest_noti.svg"
import ImageNoti from "@assets/icons/image_noti.svg"

export const optionSegmented: any = [
  {
    label: "Overview",
    value: "Overview",
  },
  {
    label: (
      <div id="text__primary" className="flex space-x-2">
        <p>Comparative Imaging</p>
        <Tooltip placement="bottom" title="Comparing photos of wounds to observe differences in tissue.">
          <InfoCircleOutlined />
        </Tooltip>
      </div>
    ),
    value: "Comparative Imaging",
  },
  {
    label: (
      <div id="text__primary" className="flex space-x-2">
        <p>Wound Progression</p>
        <Tooltip placement="bottom" title="Progress of the wound to observe recovery.">
          <InfoCircleOutlined />
        </Tooltip>
      </div>
    ),
    value: "Wound Progression",
  },
];
export const optionNotification: any = [
  {
    label: (<div className="flex gap-2">
      <img src={NotiAll} alt="" />
      <p className="text-[#4C577C]">All</p>
    </div>),
    value: "All",
  },
  {
    label: (<div className="flex gap-2">
      <img src={ImageNoti} alt="" />
      <p className="text-[#4C577C]">Image</p>
    </div>),
    value: "Image",
  },
  {
    label: (
      <div id="text__primary" className="flex space-x-2">
        <img src={PatientNote} alt="" />
        <p>Patient note</p>
        
      </div>
    ),
    value: "Patient note",
  },
  {
    label: (
      <div id="text__primary" className="flex space-x-2">
        <img src={Suggest} alt="" />
        <p>Suggestion</p>
        
      </div>
    ),
    value: "Suggestion",
  },
];
