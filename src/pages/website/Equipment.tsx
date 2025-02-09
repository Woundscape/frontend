import { useEffect, useState } from "react";
import { UseMutationResult, useMutation } from "react-query";
import { Form, Table } from "antd";
import { Content } from "antd/es/layout/layout";
import { ColumnsType } from "antd/es/table";
import {
  IEquipType,
  IEquipment,
  IFormattedErrorResponse,
  DefaultEquipment,
  NotifyType,
  SearchField,
  EquipmentQueryParams,
  DefaultEquipQueryParams,
} from "@constants";
import UserProfile from "@components/UserProfile";
import EquipActionBar from "@components/Equipment/EquipActionBar";
import {
  getAllEquipment,
  deleteEquipment,
  getTypeEquipment,
  updateEquipment,
  searchEquipQueryParams,
} from "@api-caller";
import DeleteModal from "@components/DeleteModal";
import EquipmentModal from "@components/Equipment/EquipmentModal";
import { getColumnEquipment } from "@components/Equipment/ColumnTable";
import { displayNotification } from "@utils";

export default function Equipment() {
  const searchQueryMutation: UseMutationResult<
    IEquipment[],
    IFormattedErrorResponse,
    EquipmentQueryParams
  > = useMutation(searchEquipQueryParams);
  const updateMutation: UseMutationResult<
    boolean,
    IFormattedErrorResponse,
    IEquipment
  > = useMutation(updateEquipment);
  const deleteMutation: UseMutationResult<
    boolean,
    IFormattedErrorResponse,
    string
  > = useMutation(deleteEquipment);
  const [form, setForm] = useState<IEquipment>(DefaultEquipment);
  const [forms] = Form.useForm<IEquipment>();
  const [type, setType] = useState<IEquipType[]>([]);
  const [equipment, setEquipment] = useState<IEquipment[]>([]);
  const [equipQuery, setEquipQuery] = useState<EquipmentQueryParams>(
    DefaultEquipQueryParams
  );
  const [loading, setLoading] = useState(true);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [submitDelete, setSubmitDelete] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleModal = () => {
    setIsUpdateOpen(!isUpdateOpen);
    setForm(DefaultEquipment);
    forms.resetFields();
  };
  useEffect(() => {
    getEquipment();
  }, []);

  useEffect(() => {
    searchQueryMutation.mutate(equipQuery, {
      onSuccess(response) {
        setLoading(false);
        setEquipment(response);
      },
    });
  }, [equipQuery]);

  async function getEquipment() {
    getAllEquipment().then((response) => {
      getType();
      setEquipment(response);
    });
  }
  async function getType() {
    const data: IEquipType[] = await getTypeEquipment();
    setType(data);
    setLoading(false);
  }
  const handleActionClick = (key: string, record: IEquipment) => {
    setForm(record);
    if (key == "Edit") {
      setIsUpdateOpen(true);
    } else if (key == "Delete") {
      setIsDeleteOpen(true);
    }
  };
  const columns: ColumnsType<IEquipment> = getColumnEquipment({
    handleActionClick,
    type,
  });
  const onFilterEquipment = (value: any, field: SearchField) => {
    setLoading(true);
    setEquipQuery((prev) => ({ ...prev, [field]: value }));
  };
  const onUpdate = async () => {
    try {
      const values = await forms.validateFields();
      if (values) {
        setConfirmLoading(true);
        updateMutation.mutate(form, {
          onSuccess: () => {
            getEquipment();
            setIsUpdateOpen(false);
            setConfirmLoading(false);
            forms.resetFields();
            displayNotification(NotifyType.EDIT_EQUIP);
          },
          onError: () => {
            setConfirmLoading(false);
          },
        });
      }
    } catch (error) {}
  };
  const onDelete = async () => {
    setSubmitDelete(true);
    if (form) {
      deleteMutation.mutate(form.equip_id, {
        onSuccess: () => {
          getEquipment();
          setIsDeleteOpen(false);
          setSubmitDelete(false);
          displayNotification(NotifyType.DEL_EQUIP);
        },
      });
    }
  };
  const onChange = async (e: any) => {
    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };
  const onSelect = async (value: string, name: string) => {
    forms.setFieldsValue({ [name]: value });
    setForm((prevForm) => {
      return { ...prevForm, [name]: value };
    });
  };
  return (
    <>
      <div className="w-full h-screen relative">
        <div className="w-full h-full py-8 bg-white">
          <div className="w-full h-full flex flex-col">
            <header className="flex justify-between px-6 border-b-2 pb-5 border-[#E9EBF5]">
              <div className="flex items-center space-x-4">
                <p className="jura text-xl text-[#424241]">Equipment</p>
              </div>
              <div className="w-[30rem]">
                <UserProfile />
              </div>
            </header>
            <Content className="px-6 pt-6 flex grow">
              <div className="w-full h-full flex flex-col space-y-2">
                {/* Input Filter */}
                <EquipActionBar
                  type={type}
                  placeholder="Search by Equipment Name"
                  onFilter={onFilterEquipment}
                  onRender={getEquipment}
                />
                {/* Body */}
                <Content id="content_equipment" className="w-full h-full grow">
                  <Table
                    id="table__primary"
                    aria-label={"pointer"}
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
                      defaultPageSize: 10,
                      showSizeChanger: false,
                    }}
                  />
                  <EquipmentModal
                    data={form}
                    forms={forms}
                    isOpen={isUpdateOpen}
                    confirmLoading={confirmLoading}
                    setLoading={setConfirmLoading}
                    setModal={handleModal}
                    onSubmit={onUpdate}
                    onChange={onChange}
                    onSelect={onSelect}
                    onRender={getEquipment}
                  />
                  <DeleteModal
                    title="Are you sure ?"
                    description="Are you sure that you want to delete these images"
                    isOpen={isDeleteOpen}
                    confirmLoading={submitDelete}
                    onCancel={() => setIsDeleteOpen(false)}
                    onSubmit={onDelete}
                  />
                </Content>
              </div>
            </Content>
          </div>
        </div>
      </div>
    </>
  );
}
