import { useState } from "react";
import { Button, DatePicker, Input, Select } from "antd";
import { IFormattedErrorResponse, IPatient, SearchField } from "@constants";
import { UseMutationResult, useMutation } from "react-query";
import { uploadImage } from "@api-caller";
import { LuImagePlus } from "react-icons/lu";
import SortBy from "@assets/icons/sortBy.svg";
import UploadModal from "./UploadModal";
import Consult from "./ConsultModal";
import { optionImageSortBy } from "@utils";
import { filterOptions } from "@config";
import { IoSearchSharp } from "react-icons/io5";

const { RangePicker } = DatePicker;

interface IImageActionBarProps {
  cases: IPatient;
  placeholder?: string;
  onFilter: (value: any, field: SearchField) => void;
  onRender: () => void;
}

export default function ImageActionBar({
  cases,
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
          allowClear
          className="w-1/4"
          size="middle"
          type="text"
          placeholder={placeholder}
          prefix={<IoSearchSharp color={"#BFBFBF"} />}
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
            defaultValue="None"
            bordered={false}
            placeholder="Sort by"
            options={optionImageSortBy}
            filterOption={filterOptions}
            onChange={(value) => onFilter(value, SearchField.ORDER_BY)}
          />
        </div>
        <Consult hn_id={cases.hn_id} case_id={cases.case_id} />
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
            "Drag and drop images or browse files on your computer"
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
