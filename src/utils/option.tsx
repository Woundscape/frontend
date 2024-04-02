import { Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { LuImagePlus } from "react-icons/lu";
import { IoMailUnreadOutline } from "react-icons/io5";
import { BiUserPin } from "react-icons/bi";
import { TbCirclesRelation } from "react-icons/tb";
import { IEquipType, NotificationType } from "@constants";

interface IOption {
  value: string;
  label: string;
}

export const formatOptionType = (data: IEquipType[]) => {
  const options: IOption[] = data.map((item) => ({
    value: item.type_id,
    label: item.type_name,
  }));
  return options;
};

export const optionImageSortBy: IOption[] = [
  { value: "None", label: "None" },
  { value: "Unread", label: "Unread" },
  { value: "Read", label: "Read" },
  { value: "Oldest", label: "Oldest" },
  { value: "Newest", label: "Newest" },
];

export const optionPatientSortBy: IOption[] = [
  { value: "Oldest", label: "Oldest" },
  { value: "Newest", label: "Newest" },
];

export const optionSegmented: any = [
  {
    label: "Overview",
    value: "Overview",
  },
  {
    label: (
      <div id="text__primary" className="flex space-x-2">
        <p>Comparative Imaging</p>
        <Tooltip
          placement="bottom"
          title="Comparing photos of wounds to observe differences in tissue."
        >
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
        <Tooltip
          placement="bottom"
          title="Progress of the wound to observe recovery."
        >
          <InfoCircleOutlined />
        </Tooltip>
      </div>
    ),
    value: "Wound Progression",
  },
];

export const optionNotification: any = [
  {
    label: (
      <div className="flex gap-2 items-center">
        <TbCirclesRelation size={20} color="#949cb6" />
        <p className="text-[#4C577C]">All</p>
      </div>
    ),
    value: "all",
  },
  {
    label: (
      <div className="flex gap-2 items-center">
        <LuImagePlus size={20} color="#949cb6" />
        <p className="text-[#4C577C]">Image</p>
      </div>
    ),
    value: NotificationType.UPLOAD,
  },
  {
    label: (
      <div id="text__primary" className="flex gap-2 items-center">
        <BiUserPin size={22} color="#949cb6" />
        <p>Patient note</p>
      </div>
    ),
    value: NotificationType.NOTE,
  },
  {
    label: (
      <div id="text__primary" className="flex gap-2 items-center">
        <IoMailUnreadOutline size={22} color="#949cb6" />
        <p>Suggestion</p>
      </div>
    ),
    value: NotificationType.CONSULT,
  },
];
