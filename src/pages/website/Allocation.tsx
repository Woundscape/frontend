import { useState, useEffect } from "react";
import UserProfile from "@components/UserProfile";
import { Table } from "antd";
import { Content } from "antd/es/layout/layout";
import { ColumnsType } from "antd/es/table";
import { UseMutationResult, useMutation } from "react-query";
import { getColumnsAllocation } from "@components/Allocation/ColumnTable";
import {
  IUpdateCase,
  getAllCase,
  getAllDoctor,
  searchAllocationQueryParams,
  updateDoctor,
} from "@api-caller";
import {
  AllocationQueryParams,
  DefaultUserQueryParams,
  DoctorType,
  ICase,
  IDoctor,
  IFormattedErrorResponse,
  SearchField,
} from "@constants";
import { useAuth } from "@components/AuthProvider";
import { useNavigate } from "react-router-dom";
import AllocationActionBar from "@components/Allocation/AllocationActionBar";

export default function Allocation() {
  const searchQueryMutation: UseMutationResult<
    ICase[],
    IFormattedErrorResponse,
    AllocationQueryParams
  > = useMutation(searchAllocationQueryParams);
  const updateMutation: UseMutationResult<
    boolean,
    IFormattedErrorResponse,
    IUpdateCase
  > = useMutation(updateDoctor);
  const { me } = useAuth();
  const router = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ICase[]>([]);
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [userQuery, setUserQuery] = useState<AllocationQueryParams>(
    DefaultUserQueryParams
  );
  const columns: ColumnsType<ICase> = getColumnsAllocation({
    updateMutation,
    doctors,
  });

  useEffect(() => {
    if (
      me?.doctor_type != DoctorType.Expert &&
      me?.doctor_type != DoctorType.Admin
    ) {
      router(-1);
    }
  }, [me]);

  useEffect(() => {
    searchQueryMutation.mutate(userQuery, {
      onSuccess(response) {
        setData(response);
        setIsLoading(false);
      },
    });
  }, [userQuery]);

  useEffect(() => {
    getAllCase().then((data) => {
      // const sortedData = data.sort(
      //   (a: any, b: any) =>
      //     new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      // );
      setData(data);
      getAllDoctor(true).then((doctors) => {
        setDoctors(doctors);
        setIsLoading(false);
      });
    });
  }, [updateMutation.data]);

  const filterCase = (value: any, field: SearchField) => {
    setIsLoading(true);
    if (field == SearchField.DATE) {
      setUserQuery((prev) => ({
        ...prev,
        start_at: value[0],
        end_at: value[1],
      }));
    } else {
      setUserQuery((prev) => ({ ...prev, [field]: value }));
    }
  };
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
                <div className="w-full flex flex-col space-y-2">
                  {/* Input Filter */}
                  <AllocationActionBar
                    placeholder="Search by name"
                    onFilter={filterCase}
                  />
                  {/* Body */}
                  <Content className="w-full h-full grow">
                    <Table
                      id="table__primary"
                      dataSource={data}
                      columns={columns}
                      loading={isLoading}
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
