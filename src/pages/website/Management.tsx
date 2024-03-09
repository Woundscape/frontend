import { useEffect, useState } from "react";
import { UseMutationResult, useMutation } from "react-query";
import { Table } from "antd";
import { Content } from "antd/es/layout/layout";
import { ColumnsType } from "antd/es/table";
import {
  DoctorType,
  IDoctor,
  IFormattedErrorResponse,
  ACTION_MANAGE,
  NotifyType,
} from "@constants";
import {
  deleteDoctor,
  getAllDoctor,
  IUpdateDoctorType,
  updateDoctorType,
  verifiedDoctor,
} from "@api-caller";
import UserProfile from "@components/UserProfile";
import ConfirmModal from "@components/ConfirmModal";
import { getColumnManageUser } from "@components/Management/ColumnTable";
import { displayNotification } from "@utils";
import { useAuth } from "@components/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Management() {
  const updateTypeMutation: UseMutationResult<
    boolean,
    IFormattedErrorResponse,
    IUpdateDoctorType
  > = useMutation(updateDoctorType);
  const verifyMutation: UseMutationResult<
    boolean,
    IFormattedErrorResponse,
    string
  > = useMutation(verifiedDoctor);
  const deleteMutation: UseMutationResult<
    boolean,
    IFormattedErrorResponse,
    string
  > = useMutation(deleteDoctor);
  const { me } = useAuth();
  const router = useNavigate();
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [titleModal, setTitleModal] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [approveState, setApproveState] = useState({
    action: "",
    doctor_id: "",
  });
  useEffect(() => {
    getDoctor();
  }, [
    updateTypeMutation.isSuccess,
    verifyMutation.isSuccess,
    deleteMutation.isSuccess,
  ]);

  useEffect(() => {
    if (
      me?.doctor_type != DoctorType.Expert &&
      me?.doctor_type != DoctorType.Admin
    ) {
      router(-1);
    }
  }, [me]);
  async function getDoctor() {
    getAllDoctor(false).then((doctors: IDoctor[]) => {
      const doctorWithRowEditable = doctors.map((doctor: IDoctor) => {
        const type = doctor.doctor_type;
        const roleAdmin = type == DoctorType.Admin;
        const roleDoctor = type == DoctorType.Doctor;
        const roleExpert = type == DoctorType.Expert;
        return {
          ...doctor,
          isRowEditable: false,
          isDoctor: roleAdmin || roleDoctor,
          isExpert: roleAdmin || roleExpert,
        };
      });
      setDoctors(doctorWithRowEditable);
      setLoading(false);
    });
  }
  const columns: ColumnsType<IDoctor> = getColumnManageUser({
    // For Approve new Register
    onAprrove: (action: string, doctor_id: string) => {
      setApproveState({ action, doctor_id });
      setIsModalOpen(true);
      if (action == ACTION_MANAGE.APPROVE) {
        setTitleModal("Approve User");
        setDescription("Approve: Kid kom hai noew");
      } else if (action == ACTION_MANAGE.REJECT) {
        setTitleModal("Reject User");
        setDescription("Reject: Kid kom hai noew");
      }
    },
    onToggleRowEdit: (action: string, rowIndex: number, record: IDoctor) => {
      if (action == ACTION_MANAGE.EDIT || action == ACTION_MANAGE.CANCEL) {
        setDoctors((prevData) => {
          const doctorIndex = prevData.findIndex(
            (doctor) => doctor.doctor_id === record.doctor_id
          );
          if (doctorIndex !== -1) {
            const updatedData = [...prevData];
            updatedData[doctorIndex].isRowEditable =
              !updatedData[doctorIndex].isRowEditable;
            return updatedData;
          }
          return prevData;
        });
      } else if (action == ACTION_MANAGE.DONE) {
        const body: IUpdateDoctorType = {
          isDoctor: record.isDoctor ?? false,
          isExpert: record.isExpert ?? false,
          doctor_id: record.doctor_id,
        };
        updateTypeMutation.mutate(body, {
          onSuccess: () => {
            setDoctors((prevData) => {
              const doctorIndex = prevData.findIndex(
                (doctor) => doctor.doctor_id === record.doctor_id
              );
              if (doctorIndex !== -1) {
                const updatedData = [...prevData];
                updatedData[doctorIndex].isRowEditable =
                  !updatedData[doctorIndex].isRowEditable;
                return updatedData;
              }
              return prevData;
            });
          },
        });
      } else if (action == ACTION_MANAGE.DELETE) {
        setApproveState({
          action: ACTION_MANAGE.DELETE,
          doctor_id: record.doctor_id,
        });
        setTitleModal("Delete User");
        setDescription("Delete: Kid kom hai noew");
        setIsModalOpen(true);
      }
    },

    onChecked: (type, record: IDoctor) => {
      if (type == "isDoctor") {
        setDoctors((prevDoctor) => {
          const updatedDoctors = prevDoctor.map((doc) => {
            if (doc.doctor_id === record.doctor_id) {
              return { ...doc, isDoctor: !record.isDoctor };
            }
            return doc;
          });
          return updatedDoctors;
        });
      }
      if (type == "isExpert") {
        setDoctors((prevDoctor) => {
          const updatedDoctors = prevDoctor.map((doc) => {
            if (doc.doctor_id === record.doctor_id) {
              return { ...doc, isExpert: !record.isExpert };
            }
            return doc;
          });
          return updatedDoctors;
        });
      }
    },
  });
  const onSubmit = async () => {
    try {
      setConfirmLoading(true);
      if (approveState.action == ACTION_MANAGE.APPROVE) {
        verifyMutation.mutate(approveState.doctor_id, {
          onSuccess: () => {
            setIsModalOpen(false);
            setConfirmLoading(false);
            displayNotification(NotifyType.SUCCESS);
          },
        });
      } else if (approveState.action == ACTION_MANAGE.REJECT) {
        const body: IUpdateDoctorType = {
          isReject: true,
          doctor_id: approveState.doctor_id,
        };
        updateTypeMutation.mutate(body, {
          onSuccess: () => {
            setIsModalOpen(false);
            setConfirmLoading(false);
            displayNotification(NotifyType.SUCCESS);
          },
        });
      } else if (approveState.action == ACTION_MANAGE.DELETE) {
        deleteMutation.mutate(approveState.doctor_id, {
          onSuccess: () => {
            setIsModalOpen(false);
            setConfirmLoading(false);
            displayNotification(NotifyType.SUCCESS);
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
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
                      id="table__primary"
                      dataSource={doctors}
                      columns={columns}
                      loading={loading}
                      tableLayout="fixed"
                      rowKey={(record) => `table__row__${record.doctor_id}`}
                      pagination={{
                        defaultPageSize: 7,
                        showSizeChanger: false,
                      }}
                      rowClassName={(record) => {
                        const isDisabled =
                          record.doctor_type == DoctorType.Reject;
                        return isDisabled ? "disabled-row" : "";
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
