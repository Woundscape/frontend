import { LeftOutlined } from "@ant-design/icons";
import { getInstanceLocal } from "@api/apiClient";
import DropdownField from "@components/DropdownField";
import { IDoctor, IManagement } from "@constraint/constraint";
import UserProfile from "@features/UserProfile";
import { App, Select, Table, Tag, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { ColumnsType } from "antd/es/table";
import { useState, useEffect } from "react";

// const { RangePicker } = DatePicker;
export default function Management() {
  useEffect(() => {
    getInstanceLocal()
      .get("/patient")
      .then((res) => {
        setData(res.data);
        setLoading(false);
        console.log(res.data);
      });
  }, []);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IManagement[]>([]);
  const columns: ColumnsType<IManagement> = [
    {
      title: "Hospital No.",
      dataIndex: "hn_id",
      key: "hn_id",
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
      render: (_, { doctor_assign }) => (
        <DropdownField data={doctor_assign} />
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
    },
    {
      title: "Start date & time",
      dataIndex: "created_at",
      key: "created_at",
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
