import { LeftOutlined } from "@ant-design/icons";
import { getAllCase, updateCase } from "@api-caller/caseApi";
import { DropdownField } from "@components/DropdownField";
import { ICase, IFormattedErrorResponse } from "@constraint/constraint";
import { formatTimeDifference } from "@features/FormatDate";
import UserProfile from "@features/UserProfile";
import { UseMutationResult, useMutation } from "react-query";
import { Table, Tag, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { ColumnsType } from "antd/es/table";
import { useState, useEffect } from "react";

// const { RangePicker } = DatePicker;
export default function Management() {
  const updateMutation: UseMutationResult<
    boolean,
    IFormattedErrorResponse,
    { params: string; body: any }
  > = useMutation(updateCase);
  useEffect(() => {
    getAllCase().then((data) => {
      const sortedData = data.sort(
        (a: any, b: any) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
      setData(sortedData);
      setLoading(false);
    });
  }, [updateMutation.data]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ICase[]>([]);
  const columns: ColumnsType<ICase> = [
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
        <DropdownField
          key={index}
          data={data}
          updateMutation={updateMutation}
        />
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
  return (
    <>
      <div className="w-full h-screen relative">
        <div className="w-full h-full py-8 bg-white">
          <div className="w-full h-full">
            <header className="flex justify-between px-6 border-b-2 pb-5 border-[#E9EBF5]">
              <div className="flex items-center space-x-4">
                <LeftOutlined />
                <p className="jura text-xl">Management</p>
              </div>
              <div className="w-[30rem]">
                <UserProfile />
              </div>
            </header>
            <Content className="px-6 pt-6">
              <div className="w-full flex flex-row">
                <div className="w-full flex flex-col">
                  {/* Input Filter */}

                  {/* Body */}
                  <Table
                    id="management__table__patient"
                    dataSource={data}
                    columns={columns}
                    loading={loading}
                    tableLayout="fixed"
                    rowKey={(_, index) => `table__row__${index}`}
                  />
                </div>
              </div>
            </Content>
          </div>
        </div>
      </div>
    </>
  );
}
