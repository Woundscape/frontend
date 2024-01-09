// columnsConfig.ts
import { ColumnsType } from "antd/es/table";
import { Typography, Tag } from "antd";
import { formatTimeDifference } from "@features/FormatDate";
import MoreIcon from "@assets/icons/more_icon.svg";

export const getColumns = (): ColumnsType<any> => [
  {
    title: "Hospital No.",
    dataIndex: "hn_id",
    key: "hn_id",
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
    title: "Admit No.",
    dataIndex: "admit_no",
    key: "admit_no",
    render(value, _, index) {
      return (
        <>
          <Typography key={index} className="jura truncate">
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
      <div className="mr-6 first-letter:bg-red-200 flex justify-center">
        <img src={MoreIcon} alt="" />
      </div>
    ),
  },
];
