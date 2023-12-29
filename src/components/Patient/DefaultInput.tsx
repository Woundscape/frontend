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
import SortBy from "@assets/icons/sortBy.svg";
import { SegmentedValue } from "antd/es/segmented";
import UploadModal from "./UploadModal";
import { useState } from "react";

const { RangePicker } = DatePicker;

interface IDefaultInputProps {
  segmented?: boolean;
  images?: boolean;
  onFilter: (e: any) => void;
  onChangeView?: (e: SegmentedValue) => void;
}

export default function DefaultInput({
  segmented,
  images,
  onFilter,
  onChangeView,
}: IDefaultInputProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const onCancel = () => {
    setIsModalOpen(!isModalOpen);
  };
  const onSubmit = () => {
    setSubmitLoading(true);
  };
  return (
    <>
      <div id="react__patient__input" className="flex space-x-2">
        <Input
          className="w-1/4"
          size="middle"
          type="number"
          placeholder="Search by hospital number"
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
              icon={<UserAddOutlined />}
            >
              Add Image
            </Button>
            <UploadModal
              title="Add Image"
              description={
                "If you change new doctor, it will disappear from current doctor and send this patient to new doctor"
              }
              isOpen={isModalOpen}
              confirmLoading={submitLoading}
              onSubmit={onSubmit}
              onCancel={onCancel}
            />
          </>
        )}
      </div>
    </>
  );
}
