// columnsConfig.ts
import { ColumnsType } from "antd/es/table";
import { Dropdown, MenuProps, Typography } from "antd";
import { formatTimeDifference } from "@features/FormatDate";
import { IEquipment } from "@constants/interface";
import MoreIcon from "@assets/icons/more_icon.svg";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: <div>Edit</div>,
  },
  {
    key: "2",
    label: <div>Delete</div>,
  },
];

export const getColumnEquipment = (): ColumnsType<IEquipment> => [
  {
    title: "Equipment id.",
    dataIndex: "equip_id",
    key: "equip_id",
    render(value: string, _, index) {
      return (
        <>
          <Typography key={index} className="jura truncate">
            {value}
          </Typography>
        </>
      );
    },
  },
  {
    title: "Equipment name",
    dataIndex: "equip_name",
    key: "equip_name",
    render(value, _, index) {
      return (
        <>
          <Typography key={index} className="jura truncate">
            {value}
          </Typography>
          {/* <Input disabled={!test} value={value} bordered={test} key={index} className="jura truncate" /> */}
        </>
      );
    },
  },
  {
    title: "Equipment Type",
    dataIndex: "equip_type",
    key: "equip_type",
  },
  {
    title: "Last Updated",
    dataIndex: "updated_at",
    key: "updated_at",
    render: (_, { updated_at }, index) => (
      <Typography key={index} id="text__primary">
        {formatTimeDifference(updated_at)}
      </Typography>
    ),
  },
  {
    title: "Start date & time",
    dataIndex: "created_at",
    key: "created_at",
    render: (_, { created_at }, index) => (
      <Typography key={index} id="text__primary">
        {formatTimeDifference(created_at)}
      </Typography>
    ),
  },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 100,
    render: () => (
      <div id="action_table" onClick={(e) => e.stopPropagation()}>
        <Dropdown menu={{ items }} trigger={["click"]} className="h-full">
          <div className="mr-6 flex justify-center">
            <img src={MoreIcon} alt="" />
          </div>
        </Dropdown>
      </div>
    ),
  },
];
