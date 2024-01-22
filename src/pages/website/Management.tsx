import { UseMutationResult, useMutation } from "react-query";
import { LeftOutlined } from "@ant-design/icons";
import { IUpdateCase, updateCase } from "@api-caller/caseApi";
import { IFormattedErrorResponse, IManageUser } from "@constants/interface";
import UserProfile from "@features/UserProfile";
import { Table } from "antd";
import { Content } from "antd/es/layout/layout";
import { useState } from "react";
import { ColumnsType } from "antd/es/table";
import { getColumnManageUser } from "@components/Management/ColumnTable";

export default function Management() {
  const updateMutation: UseMutationResult<
    boolean,
    IFormattedErrorResponse,
    IUpdateCase
  > = useMutation(updateCase);
  const [data, setData] = useState<IManageUser[]>([
    {
      user_id: "1",
      user_firstname: "test",
      user_lastname: "test2",
      user_type: "Doctor",
      line_uid: "sd",
      created_at: new Date("2002-05-24"),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const columns: ColumnsType<IManageUser> = getColumnManageUser();
  return (
    <>
      <div className="w-full h-screen relative">
        <div className="w-full h-full py-8 bg-white">
          <div className="w-full h-full flex flex-col">
            <header className="flex justify-between px-6 border-b-2 pb-5 border-[#E9EBF5]">
              <div className="flex items-center space-x-4">
                <LeftOutlined />
                <p className="jura text-xl">User Management</p>
              </div>
              <div className="w-[30rem]">
                <UserProfile />
              </div>
            </header>
            <Content className="px-6 pt-6">
              <div className="w-full h-full flex">
                <div className="w-full flex flex-col">
                  {/* Input Filter */}
                  {/* Body */}
                  <Content className="w-full h-full grow">
                    <Table
                      id="management__table__patient"
                      dataSource={data}
                      columns={columns}
                      loading={loading}
                      tableLayout="fixed"
                      rowKey={(_, index) => `table__row__${index}`}
                    />
                  </Content>
                </div>
              </div>
            </Content>
          </div>
        </div>
      </div>
    </>
  );
}
