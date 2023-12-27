// columnsConfig.ts
import { ColumnsType } from "antd/es/table";
import { Typography, Tag } from "antd";
import { formatTimeDifference } from "@features/FormatDate";


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
            {value}
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
      <>
        {"123"?.split("")?.map((value: string, index: number) => {
          let color = value.length > 5 ? "geekblue" : "green";
          if (value === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={`${value}-${index}`} className="jura">
              {value}
            </Tag>
          );
        })}
      </>
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
];
