// columnsConfig.ts
import { Typography, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { formatDate } from "@utils";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";

const items = [
  {
    key: "Edit",
    label: (
      <div className="flex gap-2" id="text__primary">
        <BiEditAlt size={19} color="#949cb6" />
        Edit
      </div>
    ),
  },
  {
    key: "Delete",
    label: (
      <div className="flex gap-2" id="text__primary">
        <RiDeleteBin5Line size={19} color="#949cb6" />
        Delete
      </div>
    ),
  },
];

export const getColumnsPatient = (): ColumnsType<any> => [
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
        {disease && disease.length > 0 ? (
          <>
            <Tag color={"pink"} className="jura">
              {disease[0]}
            </Tag>
            {disease.length > 1 && (
              <Typography id="text__disease">+{disease.length - 1}</Typography>
            )}
          </>
        ) : (
          <p>-</p>
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
  // {
  //   title: "Action",
  //   key: "operation",
  //   fixed: "right",
  //   width: 100,
  //   render: () => (
  //     <div id="action_table" onClick={(e) => e.stopPropagation()}>
  //       <Dropdown menu={{ items }} trigger={["click"]} className="h-full">
  //         <div className="mr-6 py-4 flex justify-center">
  //           <img src={MoreIcon} width={20} alt="" />
  //         </div>
  //       </Dropdown>
  //     </div>
  //   ),
  // },
];
