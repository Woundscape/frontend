// columnsConfig.ts
import { ColumnsType } from "antd/es/table";
import { Button, Checkbox, Space, Typography } from "antd";
import { formatTimeDifference } from "@features/FormatDate";
import { IDoctor } from "@constants/interface";

interface ColumnsManageUserProps {
  onChangeDoctor: () => void;
  onToggleRowEdit: (rowIndex: number) => void;
}

export const getColumnManageUser = ({
  onChangeDoctor,
  onToggleRowEdit,
}: ColumnsManageUserProps): ColumnsType<IDoctor> => [
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
    render(value, record, index) {
      return (
        <>
          <Typography key={index} className="jura truncate capitalize">
            {record.doctor_firstname + " " + record.doctor_lastname}
          </Typography>
        </>
      );
    },
  },
  {
    title: "Doctor",
    dataIndex: "doctor",
    key: "doctor",
    render(value, record, index) {
      return (
        <Checkbox
          key={`checkbox__doctor__${index}`}
          checked={record.doctor_verified}
          onChange={onChangeDoctor}
          disabled={record.isRowEditable}
        />
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
          <Checkbox
            key={`checkbox__admin__${index}`}
            disabled={record.isRowEditable}
          />
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
    dataIndex: "action",
    key: "action",
    render: (_, record, index) => (
      <Space id="action_management__table">
        {record.doctor_verified ? (
          <>
            <Button type="text" onClick={() => onToggleRowEdit(index)}>
              {record.isRowEditable ? "Done" : "Edit"}
            </Button>
            <Button type="text">
              {record.isRowEditable ? "Cancel" : "Delete"}
            </Button>
          </>
        ) : (
          <>
            <Button type="text" className="button_add">
              Approve
            </Button>
            <Button>Reject</Button>
          </>
        )}
      </Space>
    ),
  },
];
