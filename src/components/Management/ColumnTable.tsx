import { MdDownloadDone, MdOutlineCancel } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { ACTION_MANAGE, DoctorType, IDoctor } from "@constants";
import { ColumnsType } from "antd/es/table";
import { Button, Checkbox, Space, Typography } from "antd";
import { formatDate } from "@utils";
import { IoMdCheckboxOutline } from "react-icons/io";
import { LiaUserLockSolid } from "react-icons/lia";
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
        {formatDate(created_at)}
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
              className="jura flex text-[#4C577C]"
              onClick={() => onToggleRowEdit(ACTION_MANAGE.DONE, index, record)}
            >
              <MdDownloadDone size={19} color="#949cb6" />
              Done
            </Button>
            <Button
              type="text"
              className="jura flex text-[#4C577C]"
              onClick={() =>
                onToggleRowEdit(ACTION_MANAGE.CANCEL, index, record)
              }
            >
              <MdOutlineCancel size={19} color="#949cb6" />
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
              className="jura gap-2 text-[#4C577C] flex justify-center items-center"
              onClick={() => onToggleRowEdit(ACTION_MANAGE.EDIT, index, record)}
            >
              <BiEditAlt size={19} color="#949cb6" />
              Edit
            </Button>
            <Button
              type="text"
              className="jura gap-1 text-[#4C577C] flex justify-center items-center"
              onClick={() =>
                onToggleRowEdit(ACTION_MANAGE.DELETE, index, record)
              }
            >
              <RiDeleteBin5Line size={19} color="#949cb6" />
              Delete
            </Button>
          </>
        );
      };
      return (
        <Space id="action_management__table">
          {record.doctor_type != DoctorType.Reject && (
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
                    className="button_add"
                    onClick={() =>
                      onAprrove(ACTION_MANAGE.APPROVE, record.doctor_id)
                    }
                  >
                    <IoMdCheckboxOutline size={19} color="#949cb6" />
                    Approve
                  </Button>
                  <Button
                    className="button_reject"
                    onClick={() =>
                      onAprrove(ACTION_MANAGE.REJECT, record.doctor_id)
                    }
                  >
                    <LiaUserLockSolid size={19} color="#949cb6" />
                    Reject
                  </Button>
                </>
              )}
            </Space>
          )}
        </Space>
      );
    },
  },
];
