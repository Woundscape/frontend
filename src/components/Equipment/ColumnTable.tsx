// columnsConfig.ts
import MoreIcon from "@assets/icons/more_icon.svg";
import { Dropdown, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { formatDate } from "@utils";
import { IEquipType, IEquipment } from "@constants";

const items = [
  {
    key: "Edit",
    label: <div id="text__primary">Edit</div>,
  },
  {
    key: "Delete",
    label: <div id="text__primary">Delete</div>,
  },
];

interface ColumnsEquipProps {
  handleActionClick: (key: string, record: IEquipment) => void;
  type: IEquipType[];
}

export const getColumnEquipment = ({
  handleActionClick,
  type,
}: ColumnsEquipProps): ColumnsType<IEquipment> => [
  // ... other columns
  {
    title: "Equipment id.",
    dataIndex: "equip_id",
    key: "equip_id",
    render(value: string, _, index) {
      return (
        <>
          <Typography key={index} id="text__primary" className="jura truncate">
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
          <Typography key={index} id="text__primary" className="jura truncate">
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
    render(value, _, index) {
      const filteredTypes = type.filter((item) => item.type_id === value);
      return filteredTypes[0]?.type_name;
    },
  },
  {
    title: "Last Updated",
    dataIndex: "updated_at",
    key: "updated_at",
    render: (_, { updated_at }, index) => (
      <Typography key={index} id="text__primary">
        {formatDate(updated_at)}
      </Typography>
    ),
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
    key: "action",
    fixed: "right",
    width: 100,
    render: (_, record, index) => (
      <div id="action_table" onClick={(e) => e.stopPropagation()}>
        <Dropdown
          placement="bottomRight"
          menu={{
            onClick: ({ key }) => {
              handleActionClick(key, record);
            },
            items,
          }}
          trigger={["click"]}
          className="h-full"
        >
          <div className="mr-6 py-3 flex justify-center">
            <img src={MoreIcon} width={20} alt="" />
          </div>
        </Dropdown>
      </div>
    ),
  },
];
