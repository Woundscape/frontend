import UserProfile from "@features/UserProfile";
import { Table } from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { IEquipment } from "@constraint/constraint";
import DefaultInput from "@components/Patient/DefaultInput";
import { getColumnEquipment } from "@components/Equipment/ColumnTable";
import getAllEquipment from "@api-caller/equipApi";

export default function Equipment() {
  const router = useNavigate();
  const [data, setData] = useState<IEquipment[]>([]);
  const [equipment, setEquipment] = useState<IEquipment[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAllEquipment().then((response) => {
      setData(response);
      setEquipment(response);
      setLoading(false);
    });
  }, []);
  const columns: ColumnsType<any> = getColumnEquipment();
  const filterPatient = (e: any) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredpatient = data.filter((item) =>
      item.equip_id.toLowerCase().includes(searchTerm)
    );
    setEquipment(filteredpatient);
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
                  <DefaultInput onFilter={filterPatient} />
                  {/* Body */}
                  <Content id="content__patient" className="pt-7">
                    <Table
                      id="management__table__patient"
                      dataSource={equipment}
                      columns={columns}
                      loading={loading}
                      tableLayout="fixed"
                      rowKey={(record) => `row__patient__${record.equip_id}`}
                      pagination={{
                        defaultPageSize: 2,
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
