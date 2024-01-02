// columnsConfig.ts
import { ColumnsType } from "antd/es/table";
import { Typography } from "antd";
import { formatTimeDifference } from "@features/FormatDate";
import { IEquipment } from "@constraint/constraint";

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
];
