import { useState } from "react";
import { Button, ConfigProvider, Form, Input, Select } from "antd";
import { UseMutationResult, useMutation } from "react-query";
import SortBy from "@assets/icons/sortBy.svg";
import SearchIcon from "@assets/icon-search-upload.svg";
import {
  DefaultEquipForm,
  ICreateEquip,
  IFormattedErrorResponse,
  NotifyType,
} from "@constants";
import { addEquipment } from "@api-caller";
import { displayNotification } from "@utils";
import EquipmentModal from "./EquipmentModal";
import { MdMedicationLiquid } from "react-icons/md";

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
            displayNotification(NotifyType.SUCCESS);
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
              className="outline-none border-[white] text-[#868686] text-center"
              defaultValue="All"
              bordered={false}
              options={[
                { value: "All", label: "All" },
                { value: "Name", label: "Name" },
                { value: "Last Updated", label: "Last Updated" },
              ]}
            />
          </ConfigProvider>
        </div>
        <Button
          className="button_add"
          onClick={handleModal}
          icon={<MdMedicationLiquid size={19} />}
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
