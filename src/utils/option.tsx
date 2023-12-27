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
        <Tooltip title="test">
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
        <Tooltip title="test">
          <InfoCircleOutlined />
        </Tooltip>
      </div>
    ),
    value: "Wound Progression",
  },
];
