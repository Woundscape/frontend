import { UseMutationResult, useMutation } from "react-query";
import { IDoctor, IFormattedErrorResponse } from "@constants/interface";
import UserProfile from "@features/UserProfile";
import { Table } from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { getColumnManageUser } from "@components/Management/ColumnTable";
import getAllDoctor, { verifiedDoctor } from "@api-caller/doctorApi";
import ConfirmModal from "@components/ConfirmModal";
import { ACTION_MANAGE } from "@constants/defaultState";

export default function Management() {
  const verifyMutation: UseMutationResult<
    boolean,
    IFormattedErrorResponse,
    string
  > = useMutation(verifiedDoctor);
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  useEffect(() => {
    getDoctor();
  }, []);
  async function getDoctor() {
    getAllDoctor(false).then((doctors) => {
      const doctorWithRowEditable = doctors.map((doctor) => ({
        ...doctor,
        isRowEditable: false,
      }));
      setDoctors(doctorWithRowEditable);
      setLoading(false);
    });
  }
  const [loading, setLoading] = useState(true);
  const [titleModal, setTitleModal] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [formState, setFormState] = useState({
    action: "",
    doctor_id: "",
  });
  const columns: ColumnsType<IDoctor> = getColumnManageUser({
    onAprrove: (action: string, doctor_id: string) => {
      setFormState({ action, doctor_id });
      if (action == ACTION_MANAGE.APPROVE) {
        setIsModalOpen(true);
        setTitleModal("Approve User");
        setDescription("Approve: Kid kom hai noew");
      }
    },
    onToggleRowEdit: (rowIndex: number) => {
      setDoctors((prevData) => {
        const updatedData = [...prevData];
        updatedData[rowIndex].isRowEditable =
          !updatedData[rowIndex].isRowEditable;
        return updatedData;
      });
    },
  });
  const onSubmit = () => {
    try {
      setConfirmLoading(true);
      if (formState.action == ACTION_MANAGE.APPROVE) {
        verifyMutation.mutate(formState.doctor_id, {
          onSuccess: () => {
            setIsModalOpen(false);
            setConfirmLoading(false);
            getDoctor();
          },
        });
      }
    } catch (error) {}
  };
  const onCancel = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <>
      <div className="w-full h-screen relative">
        <div className="w-full h-full py-8 bg-white">
          <div className="w-full h-full flex flex-col">
            <header className="flex justify-between px-6 border-b-2 pb-5 border-[#E9EBF5]">
              <div className="flex items-center space-x-4">
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
                      dataSource={doctors}
                      columns={columns}
                      loading={loading}
                      tableLayout="fixed"
                      rowKey={(record) => `table__row__${record.doctor_id}`}
                      pagination={{
                        defaultPageSize: 10,
                        showSizeChanger: false,
                      }}
                    />
                    <ConfirmModal
                      title={titleModal}
                      description={description}
                      isOpen={isModalOpen}
                      confirmLoading={confirmLoading}
                      onSubmit={onSubmit}
                      onCancel={onCancel}
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
