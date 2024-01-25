import EditIcon from "@assets/icons/edit_user_icon.svg";
import DeleteIcon from "@assets/icons/delete_user_icon.svg";
import { ColumnsType } from "antd/es/table";
import { Button, Checkbox, Space, Typography } from "antd";
import { IDoctor } from "@constants/interface";
import { ACTION_MANAGE } from "@constants/defaultState";
import { formatTimeDifference } from "@features/FormatDate";

interface ColumnsManageUserProps {
  onAprrove: (action: string, doctor_id: string) => void;
  onToggleRowEdit: (rowIndex: number) => void;
}

export const getColumnManageUser = ({
  onAprrove,
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
    render(_, record, index) {
      return (
        <Checkbox
          key={`checkbox__doctor__${index}`}
          checked={record.doctor_verified}
          disabled={!record.isRowEditable}
        />
      );
    },
  },
  {
    title: "Admin",
    dataIndex: "equip_type",
    key: "equip_type",
    render(_, record, index) {
      return (
        <>
          <Checkbox
            key={`checkbox__admin__${index}`}
            disabled={!record.isRowEditable}
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
    render: (_, record, index) => {
      const isRowEditButton = () => {
        return (
          <>
            <Button
              type="text"
              className="jura text-[#4C577C]"
              onClick={() => onToggleRowEdit(index)}
            >
              Done
            </Button>
            <Button
              type="text"
              className="jura text-[#4C577C]"
              onClick={() => onToggleRowEdit(index)}
            >
              Cancel
            </Button>
          </>
        );
      };
      const isNotRowEditButton = () => {
        return (
          <>
            <Button
              type="text"
              className="jura text-[] text-[#4C577C] flex justify-cente items-center"
              onClick={() => onToggleRowEdit(index)}
              icon={<img src={EditIcon} />}
            >
              Edit
            </Button>
            <Button
              type="text"
              className="jura text-[#4C577C] flex justify-cente items-center"
              icon={<img src={DeleteIcon} />}
            >
              Delete
            </Button>
          </>
        );
      };
      return (
        <Space id="action_management__table">
          {record.doctor_verified ? (
            record.isRowEditable ? (
              isRowEditButton()
            ) : (
              isNotRowEditButton()
            )
          ) : (
            <>
              <Button
                type="text"
                className="button_add"
                onClick={() =>
                  onAprrove(ACTION_MANAGE.APPROVE, record.doctor_id)
                }
              >
                Approve
              </Button>
              <Button
                type="text"
                className="button_reject"
                onClick={() =>
                  onAprrove(ACTION_MANAGE.REJECT, record.doctor_id)
                }
              >
                Reject
              </Button>
            </>
          )}
        </Space>
      );
    },
  },
];
