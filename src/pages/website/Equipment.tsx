import UserProfile from "@features/UserProfile";
import { Table } from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { IEquipment } from "@constants/interface";
import DefaultInput from "@components/Equipment/DefaultInput";
import { getColumnEquipment } from "@components/Equipment/ColumnTable";
import getAllEquipment from "@api-caller/equipApi";

export default function Equipment() {
  const [data, setData] = useState<IEquipment[]>([]);
  const [equipment, setEquipment] = useState<IEquipment[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getEquipment()
  }, []);
  async function getEquipment() {
    getAllEquipment().then((response) => {
      setData(response);
      setEquipment(response);
      setLoading(false);
    });
  }
  const columns: ColumnsType<any> = getColumnEquipment();
  const filterEquipmentId = (e: any) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredpatient = data.filter((item) =>
      item.equip_name.toLowerCase().includes(searchTerm)
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
                <p className="jura text-xl text-[#424241]">Equipment</p>
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
                    placeholder="Search by Equipment Name"
                    onFilter={filterEquipmentId}
                    onRender={getEquipment}
                  />
                  {/* Body */}
                  <Content id="content__patient" className="pt-7">
                    <Table
                      id="management__table__patient"
                      dataSource={equipment}
                      columns={columns}
                      loading={loading}
                      tableLayout="fixed"
                      rowKey={(record) => `row__patient__${record.equip_id}`}
                      onRow={(record: IEquipment, _) => ({
                        onClick: (event: any) => {
                          console.log(event);
                        },
                      })}
                      pagination={{
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
