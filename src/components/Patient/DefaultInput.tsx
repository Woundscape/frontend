import { useState } from "react";
import {
  AppstoreOutlined,
  BarsOutlined,
} from "@ant-design/icons";
import { FaUserPlus } from "react-icons/fa";
import { Button, DatePicker, Input, Segmented, Select } from "antd";
import { SegmentedValue } from "antd/es/segmented";
import { IFormattedErrorResponse } from "@constants";
import { UseMutationResult, useMutation } from "react-query";
import { uploadImage } from "@api-caller";
import SearchIcon from "@assets/icon-search-upload.svg";
import { LuImagePlus } from "react-icons/lu";
import SortBy from "@assets/icons/sortBy.svg";
import UploadModal from "./UploadModal";
import Consult from "./Consult";

const { RangePicker } = DatePicker;

interface IDefaultPatientInputProps {
  placeholder?: string;
  segmented?: boolean;
  addPatient?: () => void;
  images?: boolean;
  onFilter: (e: any) => void;
  onRender: () => void;
  onChangeView?: (e: SegmentedValue) => void;
}

export default function DefaultInput({
  placeholder,
  segmented,
  addPatient,
  images,
  onFilter,
  onRender,
  onChangeView,
}: IDefaultPatientInputProps) {
  const uploadMutation: UseMutationResult<
    string,
    IFormattedErrorResponse,
    FormData
  > = useMutation(uploadImage);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const setLoading = (value: boolean) => {
    setConfirmLoading(value);
  };
  const setModal = (value: boolean) => {
    setIsModalOpen(value);
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
        <RangePicker size="middle" />
        <div className="flex items-center border jura rounded-lg px-3 space-x-1">
          <img className="w-5" src={SortBy} alt="" />
          <p className="text-[#BFBFBF]">Sort by :</p>
          <Select
            id="select__sortBy"
            className="w-24 outline-none border-[white] text-[#868686]"
            defaultValue="All"
            bordered={false}
            placeholder="Sort by"
            options={[
              { value: "All", label: "All" },
              { value: "Unread", label: "Unread" },
            ]}
          />
        </div>
        {segmented && (
          <Segmented
            size="middle"
            options={[
              { value: "Image", icon: <AppstoreOutlined /> },
              { value: "Table", icon: <BarsOutlined /> },
            ]}
            onChange={onChangeView}
          />
        )}
        {!images ? (
          <Button
            onClick={addPatient}
            className="button_add"
            icon={<FaUserPlus size={16}/>}
          >
            Add Patient
          </Button>
        ) : (
          <>
            <Consult />
            <Button
              onClick={() => setIsModalOpen(true)}
              className="button_add"
              icon={<LuImagePlus size={17} />}
            >
              Add Image
            </Button>
            <UploadModal
              title="Add Image"
              description={
                "If you change new doctor, it will disappear from current doctor and send this patient to new doctor"
              }
              isOpen={isModalOpen}
              confirmLoading={confirmLoading}
              setModal={setModal}
              setLoading={setLoading}
              uploadMutate={uploadMutation}
              onRender={onRender}
            />
          </>
        )}
      </div>
    </>
  );
}
