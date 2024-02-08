import { useState, useEffect } from "react";
import UserProfile from "@components/UserProfile";
import { Table } from "antd";
import { Content } from "antd/es/layout/layout";
import { ColumnsType } from "antd/es/table";
import { UseMutationResult, useMutation } from "react-query";
import { getColumnsAllocation } from "@components/Allocation/ColumnTable";
import getAllDoctor from "@api-caller/doctorApi";
import { IUpdateCase, getAllCase, updateDoctor } from "@api-caller/caseApi";
import { ICase, IDoctor, IFormattedErrorResponse } from "@constants";

export default function Allocation() {
  const updateMutation: UseMutationResult<
    boolean,
    IFormattedErrorResponse,
    IUpdateCase
  > = useMutation(updateDoctor);
  useEffect(() => {
    getAllCase().then((data) => {
      // const sortedData = data.sort(
      //   (a: any, b: any) =>
      //     new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      // );
      setData(data);
      getAllDoctor(true).then((doctors) => {
        setDoctors(doctors);
        setLoading(false);
      });
    });
  }, [updateMutation.data]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ICase[]>([]);
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const columns: ColumnsType<ICase> = getColumnsAllocation({
    updateMutation,
    doctors,
  });
  return (
    <>
      <div className="w-full h-screen relative">
        <div className="w-full h-full py-8 bg-white">
          <div className="w-full h-full flex flex-col">
            <header className="flex justify-between px-6 border-b-2 pb-5 border-[#E9EBF5]">
              <div className="flex items-center space-x-4">
                <p className="jura text-xl">Allocation</p>
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
                      id="table__primary"
                      dataSource={data}
                      columns={columns}
                      loading={loading}
                      tableLayout="fixed"
                      rowKey={(_, index) => `table__row__${index}`}
                      pagination={{
                        defaultPageSize: 7,
                        showSizeChanger: false,
                      }}
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
