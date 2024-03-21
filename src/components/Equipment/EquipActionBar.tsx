import { useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { UseMutationResult, useMutation } from "react-query";
import SortBy from "@assets/icons/sortBy.svg";
import {
  DefaultEquipForm,
  ICreateEquip,
  IEquipType,
  IFormattedErrorResponse,
  NotifyType,
} from "@constants";
import { addEquipment } from "@api-caller";
import {
  displayNotification,
  formatOptionType,
  optionImageSortBy,
} from "@utils";
import EquipmentModal from "./EquipmentModal";
import { MdMedicationLiquid } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";

interface IEquipActionBarProps {
  type: IEquipType[];
  placeholder?: string;
  onFilter: (e: any) => void;
  onRender: () => void;
}
export default function EquipActionBar({
  type,
  placeholder,
  onFilter,
  onRender,
}: IEquipActionBarProps) {
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
          onError: () => {
            setConfirmLoading(false);
            displayNotification(NotifyType.ERROR);
          },
        });
      }
    } catch (error) {
      console.log(error);
      setConfirmLoading(false);
    }
  };
  return (
    <>
      <div id="react__equipment__input" className="flex space-x-2">
        <Input
          allowClear
          className="w-1/4"
          size="middle"
          type="text"
          placeholder={placeholder}
          prefix={<IoSearchSharp color={"#BFBFBF"} />}
          onChange={onFilter}
        />
        <div className="flex items-center border jura rounded-lg px-3 space-x-1">
          <p className="text-[#BFBFBF]">Type :</p>
          <Select
            id="select__type"
            className="w-24 outline-none border-[white] text-[#868686] text-center"
            defaultValue="All"
            bordered={false}
            options={formatOptionType(type)}
          />
        </div>
        <div className="flex items-center border jura rounded-lg px-3 space-x-1">
          <img className="w-5" src={SortBy} alt="" />
          <p className="text-[#BFBFBF]">Sort by :</p>
          <Select
            id="select__sortBy"
            className="w-24 outline-none border-[white] text-[#868686] text-center"
            defaultValue="All"
            bordered={false}
            options={optionImageSortBy}
          />
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
