import UserProfile from "@features/UserProfile";
import { Table } from "antd";
import { Content } from "antd/es/layout/layout";
import ViewResult from "@assets/view_result.svg";
import { useEffect, useState } from "react";
import { getCaseByDoctorId } from "@api-caller/caseApi";
import { ColumnsType } from "antd/es/table";
import { getColumns } from "@components/Patient/ColumnTable";
import { SegmentedValue } from "antd/es/segmented";
import { useNavigate } from "react-router-dom";
import { IPatient } from "@constraint/constraint";
import DefaultInput from "@components/Patient/DefaultInput";

export default function Patient() {
  const router = useNavigate();
  const [data, setData] = useState<IPatient[]>([]);
  const [patients, setPatients] = useState<IPatient[]>([]);
  const [view, setView] = useState("Image");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getCaseByDoctorId({ params: "6dd9462c-0003-4ca6-b41d-ce16a8980feb" }).then(
      (response) => {
        setData(response);
        setPatients(response);
        setLoading(false);
      }
    );
  }, []);
  const columns: ColumnsType<any> = getColumns();
  const filterPatient = (e: any) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredpatient = data.filter((item) =>
      item.hn_id.toLowerCase().includes(searchTerm)
    );
    setPatients(filteredpatient);
  };
  const onChangeView = (e: SegmentedValue) => {
    setView(e.toString());
  };
  return (
    <>
      <div className="w-full h-screen relative">
        <div className="w-full h-full py-8 bg-white">
          <div className="w-full h-full">
            <header className="flex justify-between px-6 border-b-2 pb-5 border-[#E9EBF5]">
              <div className="flex items-center space-x-4">
                <p className="jura text-xl text-[#424241]">Patient</p>
              </div>
              <div className="w-[30rem]">
                <UserProfile />
              </div>
            </header>
            <Content className="px-6 pt-6">
              <div className="flex flex-row">
                <div className="w-full flex flex-col">
                  {/* Input Filter */}
                  <DefaultInput
                    placeholder="Search by hospital number"
                    onFilter={filterPatient}
                    onChangeView={onChangeView}
                    onRender={() => {}}
                    segmented
                  />
                  {/* Body */}
                  <Content
                    id="content__patient"
                    className="pt-7 flex flex-wrap gap-3"
                  >
                    {view == "Image" ? (
                      patients.map((patient: IPatient, index: number) => {
                        let image = patient.imagePreview[0]?.img_path
                          ? patient.imagePreview[0].img_path.replace(/\\/g, "/")
                          : null;

                        return (
                          <div
                            key={index}
                            onClick={() =>
                              router(`/patient/${patient.case_id}`)
                            }
                            className="flex flex-wrap gap-2 cursor-pointer"
                          >
                            <div
                              className="flex flex-col w-64 h-44 patient_img p-3 justify-between"
                              style={{
                                backgroundImage: `url("http://localhost:3000/${image}")`,
                              }}
                            >
                              <div className="flex flex-row justify-between text-white jura border-b-2">
                                <p className="w-24 truncate">{patient.hn_id}</p>
                                <p>
                                  {new Date(
                                    patient.updated_at
                                  ).toLocaleTimeString()}
                                </p>
                              </div>
                              <div className="flex flex-row justify-between h-8 border-2 rounded-full">
                                <p className="jura text-white p-1 pl-3">
                                  View result
                                </p>
                                <img
                                  className="pt-0.5 pb-0.5"
                                  src={ViewResult}
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <Table
                        id="management__table__patient"
                        dataSource={patients}
                        columns={columns}
                        loading={loading}
                        tableLayout="fixed"
                        rowKey={(record) => `row__patient__${record.case_id}`}
                        onRow={(record: IPatient) => ({
                          onClick: (_) => router(`/patient/${record.case_id}`),
                        })}
                        pagination={{
                          defaultPageSize: 10,
                          showSizeChanger: false,
                        }}
                      />
                    )}
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
