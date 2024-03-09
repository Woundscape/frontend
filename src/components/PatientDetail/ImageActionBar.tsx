import { useState } from "react";
import { Button, DatePicker, Input, Select } from "antd";
import { IFormattedErrorResponse, SearchField } from "@constants";
import { UseMutationResult, useMutation } from "react-query";
import { uploadImage } from "@api-caller";
import SearchIcon from "@assets/icon-search-upload.svg";
import { LuImagePlus } from "react-icons/lu";
import SortBy from "@assets/icons/sortBy.svg";
import UploadModal from "./UploadModal";
import Consult from "./ConsultModal";

const { RangePicker } = DatePicker;

interface IImageActionBarProps {
  placeholder?: string;
  onFilter: (value: any, field: SearchField) => void;
  onRender: () => void;
}

export default function ImageActionBar({
  placeholder,
  onFilter,
  onRender,
}: IImageActionBarProps) {
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
          onChange={(e) => onFilter(e.target.value, SearchField.IMAGE_ID)}
        />
        <RangePicker
          size="middle"
          format={"YYYY-MM-DD"}
          onChange={(_, dateStrings: [string, string]) => {
            onFilter(dateStrings, SearchField.DATE);
          }}
        />
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
      </div>
    </>
  );
}
