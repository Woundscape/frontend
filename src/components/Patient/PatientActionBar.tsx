import { useState } from "react";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import { FaUserPlus } from "react-icons/fa";
import { Button, DatePicker, Input, Segmented, Select } from "antd";
import { SegmentedValue } from "antd/es/segmented";
import SearchIcon from "@assets/icon-search-upload.svg";
import SortBy from "@assets/icons/sortBy.svg";

const { RangePicker } = DatePicker;

interface IPatientActionBarProps {
  placeholder?: string;
  segmented?: boolean;
  addPatient?: () => void;
  images?: boolean;
  onFilter: (e: any) => void;
  onRender: () => void;
  onChangeView?: (e: SegmentedValue) => void;
}

export default function PatientActionBar({
  placeholder,
  segmented,
  addPatient,
  onFilter,
  onChangeView,
}: IPatientActionBarProps) {
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
        <RangePicker size="middle" format={"YYYY-MM-DD"} onChange={onFilter} />
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

        <Button
          onClick={addPatient}
          className="button_add"
          icon={<FaUserPlus size={16} />}
        >
          Add Patient
        </Button>
      </div>
    </>
  );
}
