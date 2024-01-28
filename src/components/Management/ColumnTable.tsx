import EditIcon from "@assets/icons/edit_user_icon.svg";
import DeleteIcon from "@assets/icons/delete_user_icon.svg";
import { ColumnsType } from "antd/es/table";
import { Button, Checkbox, Space, Typography } from "antd";
import { IDoctor } from "@constants/interface";
import { ACTION_MANAGE } from "@constants/defaultState";
import { formatTimeDifference } from "@features/FormatDate";

interface ColumnsManageUserProps {
  onAprrove: (action: string, doctor_id: string) => void;
  onToggleRowEdit: (action: string, rowIndex: number, record: IDoctor) => void;
  onChecked: (type: string, record: IDoctor) => void;
}

export const getColumnManageUser = ({
  onAprrove,
  onToggleRowEdit,
  onChecked,
}: ColumnsManageUserProps): ColumnsType<IDoctor> => [
  {
    title: "User id.",
    dataIndex: "user_id",
    key: "user_id",
    render(value: string, _, index) {
      return (
        <Typography key={index} id="text__primary" className="jura truncate">
          {value}
        </Typography>
      );
    },
  },
  {
    title: "Name",
    dataIndex: "user_fullname",
    key: "user_fullname",
    render(_, record, index) {
      return (
        <Typography
          key={index}
          id="text__primary"
          className="jura truncate capitalize"
        >
          {record.doctor_firstname + " " + record.doctor_lastname}
        </Typography>
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
          defaultChecked={record.isDoctor}
          disabled={!record.isRowEditable}
          onChange={() => onChecked("isDoctor", record)}
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
        <Checkbox
          key={`checkbox__admin__${index}`}
          defaultChecked={record.isExpert}
          disabled={!record.isRowEditable}
          onChange={() => onChecked("isExpert", record)}
        />
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
              onClick={() => onToggleRowEdit(ACTION_MANAGE.DONE, index, record)}
            >
              Done
            </Button>
            <Button
              type="text"
              className="jura text-[#4C577C]"
              onClick={() =>
                onToggleRowEdit(ACTION_MANAGE.CANCEL, index, record)
              }
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
              onClick={() => onToggleRowEdit(ACTION_MANAGE.EDIT, index, record)}
              icon={<img src={EditIcon} />}
            >
              Edit
            </Button>
            <Button
              type="text"
              className="jura text-[#4C577C] flex justify-cente items-center"
              onClick={() =>
                onToggleRowEdit(ACTION_MANAGE.DELETE, index, record)
              }
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
