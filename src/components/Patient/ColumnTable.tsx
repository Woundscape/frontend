// columnsConfig.ts
import { Typography, Tag, Dropdown, MenuProps } from "antd";
import { ColumnsType } from "antd/es/table";
import { formatDate } from "@utils";
import MoreIcon from "@assets/icons/more_icon.svg";
import EditIcon from "@assets/icons/edit_user_icon.svg";
import DelIcon from "@assets/icons/delete_user_icon.svg";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <div className="flex gap-1">
        <img src={EditIcon} width={15} height={15} alt="" />
        <p className="jura text-[#4C577C]">Edit</p>
      </div>
    ),
  },
  {
    key: "2",
    label: (
      <div className="flex gap-1">
        <img src={DelIcon} width={15} height={15} alt="" />
        <p className="jura text-[#4C577C]">Delete</p>
      </div>
    ),
  },
];

export const getColumns = (): ColumnsType<any> => [
  {
    title: "Hospital No.",
    dataIndex: "hn_id",
    key: "hn_id",
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
    title: "Admit No.",
    dataIndex: "admit_no",
    key: "admit_no",
    render(value, _, index) {
      return (
        <>
          <Typography key={index} id="text__primary" className="jura truncate">
            {value.toString().padStart(3, "0")}
          </Typography>
        </>
      );
    },
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    // render: (_, data, index) => (
    //   <DropdownField key={index} data={data} doctor={doctors} updateMutation={updateMutation} />
    // ),
  },
  {
    title: "Progression Stage",
    dataIndex: "stage",
    key: "stage",
  },
  {
    title: "Disease",
    dataIndex: "disease",
    key: "disease",
    render: (_, { disease }) => (
      <div className="flex items-center">
        {disease && disease.length > 0 && (
          <>
            <Tag
              color={disease[0].length > 5 ? "geekblue" : "green"}
              className="jura"
            >
              {disease[0]}
            </Tag>
            {disease.length > 1 && (
              <Typography id="text__disease">+{disease.length - 1}</Typography>
            )}
          </>
        )}
      </div>
    ),
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
    key: "operation",
    fixed: "right",
    width: 100,
    render: () => (
      <div id="action_table" onClick={(e) => e.stopPropagation()}>
        <Dropdown menu={{ items }} trigger={["click"]} className="h-full">
          <div className="mr-6 py-4 flex justify-center">
            <img src={MoreIcon} width={20} alt="" />
          </div>
        </Dropdown>
      </div>
    ),
  },
];
