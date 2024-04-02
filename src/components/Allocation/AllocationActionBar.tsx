import { DatePicker, Input, Select } from "antd";
import { SearchField } from "@constants";
import SortBy from "@assets/icons/sortBy.svg";
import { optionImageSortBy } from "@utils";
import { filterOptions } from "@config";
import { IoSearchSharp } from "react-icons/io5";

const { RangePicker } = DatePicker;

interface IAllocationActionBarProps {
  placeholder?: string;
  onFilter: (value: any, field: SearchField) => void;
}

export default function AllocationActionBar({
  placeholder,
  onFilter,
}: IAllocationActionBarProps) {
  return (
    <>
      <div id="react__allocation__input" className="flex space-x-2">
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
            defaultValue="None"
            bordered={false}
            placeholder="Sort by"
            options={optionImageSortBy}
            filterOption={filterOptions}
          />
        </div>
      </div>
    </>
  );
}
