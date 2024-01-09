import { useState } from "react";
import {
  AppstoreOutlined,
  BarsOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  DatePicker,
  Input,
  Segmented,
  Select,
} from "antd";
import SearchIcon from "@assets/icon-search-upload.svg";
import AddImageIcon from "@assets/icons/add_image_icon2.svg";
import SortBy from "@assets/icons/sortBy.svg";
import { SegmentedValue } from "antd/es/segmented";
import uploadImage from "@api-caller/imageApi";
import { UseMutationResult, useMutation } from "react-query";
import { IFormattedErrorResponse } from "@constraint/constraint";
import UploadModal from "./UploadModal";

const { RangePicker } = DatePicker;

interface IDefaultInputProps {
  placeholder?: string;
  segmented?: boolean;
  images?: boolean;
  onFilter: (e: any) => void;
  onRender: () => void;
  onChangeView?: (e: SegmentedValue) => void;
}

export default function DefaultInput({
  placeholder,
  segmented,
  images,
  onFilter,
  onRender,
  onChangeView,
}: IDefaultInputProps) {
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
          <Button className="button_add" icon={<UserAddOutlined />}>
            Add Patient
          </Button>
        ) : (
          <>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="button_add"
              icon={<img src={AddImageIcon}/>}
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
