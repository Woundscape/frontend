import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import { FaUserPlus } from "react-icons/fa";
import { Button, DatePicker, Input, Segmented, Select } from "antd";
import { SegmentedValue } from "antd/es/segmented";
import SortBy from "@assets/icons/sortBy.svg";
import { optionPatientSortBy } from "@utils";
import { SearchField } from "@constants";
import { IoSearchSharp } from "react-icons/io5";

const { RangePicker } = DatePicker;

interface IPatientActionBarProps {
  placeholder?: string;
  segmented?: boolean;
  addPatient?: () => void;
  onFilter: (value: any, field: SearchField) => void;
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
          allowClear
          className="w-1/4"
          size="middle"
          type="text"
          placeholder={placeholder}
          prefix={<IoSearchSharp color={"#BFBFBF"} />}
          onChange={(e) => onFilter(e.target.value, SearchField.HN_ID)}
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
            options={optionPatientSortBy}
            onChange={(value) => onFilter(value, SearchField.ORDER_BY)}
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
