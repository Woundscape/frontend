import { useState } from "react";
import { UserAddOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, DatePicker, Form, Input, Select } from "antd";
import SearchIcon from "@assets/icon-search-upload.svg";
import SortBy from "@assets/icons/sortBy.svg";
import { UseMutationResult, useMutation } from "react-query";
import { IFormattedErrorResponse } from "@constants/interface";
import { ICreateEquip, addEquipment } from "@api-caller/equipApi";
import { DefaultEquipForm } from "@constants/defaultForm";
import EquipmentModal from "./EquipmentModal";

const { RangePicker } = DatePicker;

interface IDefaultEquipProps {
  placeholder?: string;
  onFilter: (e: any) => void;
  onRender: () => void;
}
export default function DefaultInput({
  placeholder,
  onFilter,
  onRender,
}: IDefaultEquipProps) {
  const addMutation: UseMutationResult<
    boolean,
    IFormattedErrorResponse,
    ICreateEquip
  > = useMutation(addEquipment);
  const [form, setForm] = useState<ICreateEquip>(DefaultEquipForm);
  const [forms] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
    setForm(DefaultEquipForm);
    forms.resetFields();
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
  const onSubmit = async () => {
    try {
      const values = await forms.validateFields();
      if (values) {
        setConfirmLoading(true);
        addMutation.mutate(form, {
          onSuccess: () => {
            onRender();
            setIsModalOpen(false);
            setConfirmLoading(false);
          },
          onError: () => {},
        });
      }
    } catch (error) {
      console.log(error);
      setConfirmLoading(false);
    }
  };
  return (
    <>
      <div id="react__patient__input" className="flex space-x-2">
        <Input
          className="w-1/4"
          size="middle"
          type="text"
          placeholder={placeholder}
          prefix={<img className="pr-1" src={SearchIcon} />}
          onChange={onFilter}
        />
        <div className="flex items-center border jura rounded-lg px-3 space-x-1">
          <img className="w-5" src={SortBy} alt="" />
          <p className="text-[#BFBFBF]">Sort by :</p>
          <ConfigProvider
            theme={{
              components: {
                Select: { colorBorder: "" },
              },
            }}
          >
            <Select
              id="select__sortBy"
              className="w-24 outline-none border-[white] text-[#868686]"
              defaultValue="All"
              bordered={false}
              placeholder=""
              options={[
                { value: "All", label: "All" },
                { value: "Unread", label: "Unread" },
              ]}
            />
          </ConfigProvider>
        </div>
        <Button
          className="button_add"
          onClick={handleModal}
          icon={<UserAddOutlined />}
        >
          Add Equipment
        </Button>
        <EquipmentModal
          forms={forms}
          isOpen={isModalOpen}
          confirmLoading={confirmLoading}
          setLoading={setConfirmLoading}
          setModal={handleModal}
          onSubmit={onSubmit}
          onChange={onChange}
          onSelect={onSelect}
        />
      </div>
    </>
  );
}
