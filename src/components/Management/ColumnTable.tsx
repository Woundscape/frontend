// columnsConfig.ts
import { ColumnsType } from "antd/es/table";
import { Checkbox, Space, Typography } from "antd";
import { formatTimeDifference } from "@features/FormatDate";
import { IManageUser } from "@constraint/constraint";

export const getColumnManageUser = (): ColumnsType<IManageUser> => [
  {
    title: "User id.",
    dataIndex: "user_id",
    key: "user_id",
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
    title: "Name",
    dataIndex: "user_fullname",
    key: "user_fullname",
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
    title: "Doctor",
    dataIndex: "equip_type",
    key: "equip_type",
    render(value, record, index) {
      return (
        <>
          <Space direction="horizontal">
            <Checkbox />
          </Space>
        </>
      );
    },
  },
  {
    title: "Admin",
    dataIndex: "equip_type",
    key: "equip_type",
    render(value, record, index) {
      return (
        <>
          <Space direction="horizontal">
            <Checkbox />
          </Space>
        </>
      );
    },
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
    dataIndex: "equip_type",
    key: "equip_type",
  },
];
