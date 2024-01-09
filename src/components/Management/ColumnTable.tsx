// columnsConfig.ts
import { ColumnsType } from "antd/es/table";
import { ICase, IDoctor, IFormattedErrorResponse } from "@constraint/constraint";
import { DropdownField } from "@components/Management/DropdownField";
import { UseMutationResult } from "react-query";
import { Typography, Tag } from "antd";
import { formatTimeDifference } from "@features/FormatDate";
import { IUpdateCase } from "@api-caller/caseApi";

interface ColumnsConfigProps {
  updateMutation: UseMutationResult<boolean, IFormattedErrorResponse, IUpdateCase>;
  doctors: IDoctor[];
}

export const getColumns = ({ updateMutation, doctors }: ColumnsConfigProps): ColumnsType<ICase> => [
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
    title: "User id.",
    dataIndex: "line_uid",
    key: "line_uid",
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
    title: "Doctor",
    dataIndex: "doctor_assign",
    key: "doctor_assign",
    render: (_, data, index) => (
      <DropdownField key={index} data={data} doctor={doctors} updateMutation={updateMutation} />
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Progression Stage",
    dataIndex: "stage",
    key: "stage",
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
];
