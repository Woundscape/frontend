import { InfoCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

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
